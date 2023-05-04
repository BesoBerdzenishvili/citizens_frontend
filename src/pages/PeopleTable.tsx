import { useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { useData } from "../utils/data";

const { Option } = Select;

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
      <Modal
        title={editingId ? "Edit Data" : "Add Data"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        forceRender
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter an email",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select a gender" }]}
          >
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Street"
            name={["address", "street"]}
            rules={[{ required: true, message: "Please enter a street" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="City"
            name={["address", "city"]}
            rules={[{ required: true, message: "Please enter a city" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter a phone number" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PeopleTable;
