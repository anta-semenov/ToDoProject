export const uniqueKey = (randomPartSize = 4) => {
  const random = Math.random()*Math.pow(10, randomPartSize)
  const date = +new Date()
  const key = date*Math.pow(10, randomPartSize)+(Math.trunc(random))
  return key.toString(36)
}

export default uniqueKey

export const increaseKey = (key) => {
  if (!key) {
    return '0'
  }
  if (key.substring(key.length-1) != 'z') {
    return key.substring(0, key.length-1) + 'z'
  } else if (key.substring(key.length-2) != 'z') {
    return key.substring(0, key.length-2) + 'z0'
  } else {
    return key.substring(0, key.length-3) + 'z00'
  }
}
