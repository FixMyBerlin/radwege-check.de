/*
  Native 'zustand' docs: https://github.com/pmndrs/zustand#redux-devtools
    I did not look into those too long. I did not understand how they should work.

  We use https://github.com/beerose/simple-zustand-devtools now
    Which does look like a nice tool.
    However, they are pretty harsh with updates. The recent version is React 18 only
    which is/was not communicated in the readme. I also had to work around dependency issues.
    For more…
      https://github.com/beerose/simple-zustand-devtools/issues/25#issuecomment-1160380390
      https://github.com/beerose/simple-zustand-devtools/issues/26
*/
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { useStoreSpinner } from './useStoreSpinner'

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('useStoreSpinner', useStoreSpinner)
}
