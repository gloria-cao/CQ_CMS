import useLoginStore from '@/store/login/login'

function loadLocalCache() {
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default loadLocalCache
