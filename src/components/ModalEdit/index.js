import React, { useState, useEffect} from 'react'
import { Modal, Input } from 'antd';
function ModalEditBoard({visible,handleCancel,handleOkEdit,oldName}) {
    const [input, setInput] = useState('');
    const handleOnChange=(e)=>{
        setInput(e.target.value)
    }
    return (
        <div>
            <Modal
          title="Edit Board"
          visible={visible}
          onOk={()=>handleOkEdit(input)}
          onCancel={handleCancel}
        >
        <p>Name Current: {oldName}</p>
        <Input value={input} onChange={handleOnChange} placeholder="Name Board : " />
        </Modal>
        </div>
    )
}

export default ModalEditBoard
