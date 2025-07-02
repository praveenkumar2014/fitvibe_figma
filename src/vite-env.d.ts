/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEPLOY_URL: string
  readonly VITE_URL: string
  readonly DEV: boolean
  readonly PROD: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}