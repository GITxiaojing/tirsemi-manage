import { Modal } from "view-design"

const beforeClose = {
    show_close_modal: () => {
        return new Promise((resolve, reject) => {
            Modal.confirm({
                title: '确认要关闭这一页吗？',
                onOk: () => {
                    resolve(true)
                },
                onCancel: () => {
                    reject(false)
                }
            })
        })
    }
}

export default beforeClose