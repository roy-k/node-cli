
import { lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { asyncImport } from 'components/base/getAsyncImport'

import style from './layout.module.less'

import { menuConfig } from './router.config'

export function Content() {
    return (
        <section className={style.content}>
            <Switch>
                {menuConfig.map(({ route, children, leaf }) => {
                    return (
                        <Route
                            key={route}
                            path={`/${route}`}
                            render={() => {
                                // todo 是否需要 match.path
                                // const { path } = match
                                if (leaf) {
                                    return (
                                        <Route
                                            key={route}
                                            path={`/${route}`}
                                            component={asyncImport(lazy(() => import(`pages/${route}`)))}
                                        />
                                    )
                                }
                                
                                return (
                                    <>
                                        {children
                                            ? children.map(child => {
                                                  const { route: childRoute } = child

                                                  return (
                                                      <Route
                                                          key={childRoute}
                                                          path={`/${route}/${childRoute}`}
                                                          component={asyncImport(
                                                              lazy(() => import(`pages/${route}/${childRoute}`))
                                                          )}
                                                      />
                                                  )
                                              })
                                            : null}
                                    </>
                                )
                            }}
                        />
                    )
                })}
                <Route path="/" render={() => <Redirect to={`/${menuConfig[0].route}`}/>}/>
            </Switch>
        </section>
    )
}