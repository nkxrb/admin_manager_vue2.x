
export const staticCache = {
  publicHosList: null,
  publicHosSuggestions: []
}

/**
 * 获取省
 */
export function getProvinces () {
  return new Promise((resolve, reject) => {
    const result = this.$network.post('/dict/getProvince', {}).then(res => {
      return res.data.map(item => ({ label: item.name, value: item.id }))
    })
    resolve(result)
  })
}

/**
 * 根据省ID获取城市
 * @param {Number} provinceId
 */
export function getCitys (provinceId) {
  return new Promise((resolve, reject) => {
    const result = this.$network.post(`/dict/getCity?provinceId=${provinceId || 0}`, {}).then(res => {
      return res.data.map(item => ({ label: item.name, value: item.id }))
    })
    resolve(result)
  })
}

/**
 * 根据城市ID获取地区
 * @param {Number} cityId
 */
export function getCountys (cityId) {
  return new Promise((resolve, reject) => {
    const result = this.$network.post(`/dict/getCounty?cityId=${cityId || 0}`, {}).then(res => {
      return res.data.map(item => ({ label: item.name, value: item.id }))
    })
    resolve(result)
  })
}

/**
 * 根据用户获取医院列表
 */
export function getAllHospital () {
  return new Promise((resolve, reject) => {
    const res = this.$network.post('/hos/getHospitalList?type=1', {}).then(res => {
      return res.data.map(item => ({ label: item.name, value: item.id }))
    })
    resolve(res)
  })
}

/**
 * 根据用户获取医院列表
 */
export function getCheckHospital () {
  return new Promise((resolve, reject) => {
    const res = this.$network.post('/hos/getHospitalList?type=2', {}).then(res => {
      return res.data.map(item => ({ label: item.name, value: item.id }))
    })
    resolve(res)
  })
}

/**
 * 根据用户获取医院列表
 */
export function getOnlineHospital () {
  return new Promise((resolve, reject) => {
    const res = this.$network.post('/hos/getHospitalList?type=3', {}).then(res => {
      return res.data.map(item => ({ label: item.name, value: item.id }))
    })
    resolve(res)
  })
}

/**
 * 标准科室列表
 */
export function getStandardDepartments (hospitalId) {
  return new Promise((resolve, reject) => {
    let res = []
    if (hospitalId) {
      res = this.$network.post(`/dep/getByHospitalId?hospitalId=${hospitalId}&type=1`, {}).then(res => {
        return res.data.map(item => ({ label: item.name, value: item.id }))
      })
    }
    resolve(res)
  })
}

/**
 * 根据用户获取医院列表
 */
export function getDepartments (hospitalId) {
  return new Promise((resolve, reject) => {
    let res = []
    if (hospitalId) {
      res = this.$network.post(`/dep/getByHospitalId?hospitalId=${hospitalId}&type=1`, {}).then(res => {
        return res.data.map(item => ({ label: item.name, value: item.id }))
      })
    }
    resolve(res)
  })
}

/**
 * 根据用户获取医院列表
 */
export function getOnlineDepartments (hospitalId) {
  return new Promise((resolve, reject) => {
    let res = []
    if (hospitalId) {
      res = this.$network.post(`/dep/getByHospitalId?hospitalId=${hospitalId}&type=3`, {}).then(res => {
        return res.data.map(item => ({ label: item.name, value: item.id }))
      })
    }
    resolve(res)
  })
}

/**
 * 查询医院等级
 */
export function getHospitalLevels () {
  return new Promise((resolve, reject) => {
    const res = this.$network.post('/dict/getLevelList', {}).then(res => {
      return res.data.map(item => ({ label: item.name, value: item.id }))
    })
    resolve(res)
  })
}

/**
 * 查询医生职称
 */
export function getDoctorTitles () {
  return new Promise((resolve, reject) => {
    const res = this.$network.post('/dict/getTitleList', {}).then(res => {
      return res.data.map(item => ({ label: item.name, value: item.id }))
    })
    resolve(res)
  })
}

/**
 * 查询一级标准科室
 */
export function getFirstStandardDep () {
  return new Promise((resolve, reject) => {
    const res = this.$network.post('/dep/standard/getFirstDep', {}).then(res => {
      return res.data.map(item => ({ label: item.name, value: item.id }))
    })
    resolve(res)
  })
}

/**
 * 查询二级标准科室
 */
export function getSecoudStandardDep () {
  return new Promise((resolve, reject) => {
    const res = this.$network.post('/dep/standard/getSecondDep', {}).then(res => {
      return res.data.map(item => ({ label: item.name, value: item.id }))
    })
    resolve(res)
  })
}
/**
 * 查询标准科室--树形结构
 */
export function getStandardDepTree () {
  return new Promise((resolve, reject) => {
    const res = this.$network.post('/dep/standard/getDepTree', {}).then(res => {
      return res.data
    })
    resolve(res)
  })
}

/**
 * 获取角色信息
 */
export function getRoles () {
  return new Promise((resolve, reject) => {
    const res = this.$network.post('/sys/role/getAll', {}).then(res => {
      return res.data.map(item => ({ label: item.name, value: item.id }))
    })
    resolve(res)
  })
}

/**
 * 获取角色信息
 */
export async function getPublicHospitalList (query, callback) {
  let count = 0
  const publicHosList = await this.$network.post('/dict/getPublicHospitalList?name=' + query, {}).then(res => {
    return res.data.map(item => ({ value: item.name, id: item.id }))
  })

  let result = []

  result = publicHosList.filter(item => {
    if (query) {
      return item.value && item.value.indexOf(query) > -1
    } else {
      return count++ < 100
    }
  })
  // 存储建议列表
  staticCache.publicHosSuggestions = result

  callback(result)
}

/**
 * 上传图片
 */
export function upload (file) {
  return new Promise((resolve, reject) => {
    const res = this.$network.postmultipart('/image/upload', { filename: file.file }).then(res => {
      if (res && res.data) {
        return { url: res.data[0] }
      } else {
        return { url: '/error.png' }
      }
    })
    resolve(res)
  })
}

/**
 * 医生服务评分
 */
export function getServiceGrades () {
  return new Promise((resolve, reject) => {
    const res = [
      { label: '1分', value: 1 },
      { label: '2分', value: 2 },
      { label: '3分', value: 3 },
      { label: '4分', value: 4 },
      { label: '5分', value: 5 }
    ]
    resolve(res)
  })
}

/**
 * banner位置
 */
export function getBannerPositions () {
  return new Promise((resolve, reject) => {
    const res = [
      { label: '首页顶部', value: 1 },
      { label: '其他', value: 2 }
    ]
    resolve(res)
  })
}
