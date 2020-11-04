import React, { useState} from 'react'
import { Modal, Input } from 'antd';
function ModalAddTag({visible,handleCancel,handleOk}) {
    const [input, setInput] = useState('')
    const handleOnChange=(e)=>{
        setInput(e.target.value)
    }
    return (
        <div>
            <Modal
          title="Add Tag"
          visible={visible}
          onOk={()=>handleOk(input)}
          onCancel={handleCancel}
        >
        <Input value={input} onChange={handleOnChange} placeholder="Tag Name : " />
        </Modal>
        </div>
    )
}

export default ModalAddTag
