import { Modal, Form, Input, Select } from "antd";

const { Option } = Select;

type ModalProps = {
  isModalVisible: boolean;
  editingId?: number;
  handleOk: () => void;
  handleCancel: () => void;
  form: any;
};

export default function PeopleModal({
  isModalVisible,
  editingId,
  handleOk,
  handleCancel,
  form,
}: ModalProps) {
  return (
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
  );
}
