import React, { useState } from "react";
import { Modal, Input, Typography, Button } from "antd";
const { Text } = Typography;
function ModalEditProfile({ email, name, visible, handleCancel, handleOk }) {
  const [nameUser, setName] = useState(name);
  const [isEditPass, setEditPass] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const handleNameOnChange = (e) => {
    setName(e.target.value);
  };
  const handleOldPassOnChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNewPassOnChange = (e) => {
    setNewpassword(e.target.value);
  };
  const showEdit=()=>{
      setEditPass(!isEditPass);
  }
  return (
    <div>
      <Modal
        title="Profile"
        visible={visible}
        onOk={() => handleOk({email,nameUser,password,newPassword})}
        onCancel={handleCancel}
      >
        <div>
          <Button onClick={showEdit} type="primary">Edit password</Button>
        </div>

        <Text type="success">Email: </Text>
        <Input value={email} disabled />
        <Text type="success">Name: </Text>
        <Input
          value={nameUser}
          onChange={handleNameOnChange}
          placeholder="Name : "
        />
        {isEditPass && (
          <>
            <Text type="success">Old Password: </Text>
            <Input.Password
              value={password}
              onChange={handleOldPassOnChange}
              placeholder="Old password : "
            />
            <Text type="success">New Password: </Text>
            <Input.Password
              value={newPassword}
              onChange={handleNewPassOnChange}
              placeholder="New password : "
            />
          </>
        )}
      </Modal>
    </div>
  );
}

export default ModalEditProfile;
