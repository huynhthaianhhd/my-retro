import React, { useState} from 'react'
import { Modal, Input } from 'antd';
function ModalAddBoard({visible,handleCancel,handleOk}) {
    const [input, setInput] = useState('')
    const handleOnChange=(e)=>{
        setInput(e.target.value)
    }
    return (
        <div>
            <Modal
          title="Add Board"
          visible={visible}
          onOk={()=>handleOk(input)}
          onCancel={handleCancel}
        >
        <Input value={input} onChange={handleOnChange} placeholder="Name Board : " />
        </Modal>
        </div>
    )
}

export default ModalAddBoard
