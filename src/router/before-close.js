import { Modal } from 'view-design'

const beforeClose = {
  show_close_modal: () => new Promise((resolve, reject) => {
    Modal.confirm({
      title: '确认要关闭这一页吗？',
      onOk: () => {
        resolve(true)
      },
      onCancel: () => {
        reject()
      },
    })
  }),
}

export default beforeClose
