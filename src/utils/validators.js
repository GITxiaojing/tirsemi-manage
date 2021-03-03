export const validNumber = (rule, value, callback, name) => {
  if (rule.required && !value && value !== 0) {
    callback(new Error(`${name}不能为空`))
  }
  if (window.isNaN(value)) {
    callback(new Error(`${name}应为数字`))
  }
  if (value <= 0) {
    callback(new Error(`${name}应大于0`))
  }
  callback()
}
