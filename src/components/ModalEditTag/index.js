import React, { useState} from 'react'
import { Modal, Input } from 'antd';
function ModalEditTag({visible,handleCancel,handleOk, oldName}) {
    const [input, setInput] = useState('')
    const handleOnChange=(e)=>{
        setInput(e.target.value)
    }
    return (
        <div>
            <Modal
          title="Edit Tag"
          visible={visible}
          onOk={()=>handleOk(input)}
          onCancel={handleCancel}
        >
        <Input value={input} onChange={handleOnChange} placeholder="Tag Name : " />
        </Modal>
        </div>
    )
}

export default ModalEditTag
