import { useState } from "react";
import { Table, Button, Form } from "antd";
import { useData } from "../utils/data";
import PeopleModal from "../components/PeopleModal";

type Data = {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
};

const PeopleTable = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | undefined>();
  const { data, createData, updateData, deleteData } = useData();

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Street",
      dataIndex: ["address", "street"],
      key: "street",
    },
    {
      title: "City",
      dataIndex: ["address", "city"],
      key: "city",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Data) => (
        <Button onClick={() => handleDelete(record.id)}>Delete</Button>
      ),
    },
  ];

  const handleAdd = () => {
    form.resetFields();
    setEditingId(undefined);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Data) => {
    form.setFieldsValue(record);
    setEditingId(record.id);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    deleteData(id);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        updateData({ ...values, id: editingId });
      } else {
        createData({
          ...values,
          id: Math.max(...data.map((item) => item.id)) + 1,
        });
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={handleAdd}>Add</Button>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onDoubleClick: () => handleEdit(record),
        })}
        rowKey="id"
      />
      <PeopleModal
        isModalVisible={isModalVisible}
        editingId={editingId}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
      />
    </>
  );
};

export default PeopleTable;
// refactor: move modal to separate component
// create types folder and dataTypes.ts
