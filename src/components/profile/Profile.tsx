import { useNavigation } from "@/hooks/useNavigate";
import { useStoreUser } from "@/lib/sdk";
import CheckCircleOutlined from "@ant-design/icons/lib/icons/CheckCircleOutlined";
import { Button, Card, Form, FormInstance, Input, Modal, Space, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { useReadStoreProfile } from "@/hooks/useProfile";
import { Profile } from "@/domain/profile";

const labelCol = { span: 20 }

const numberOfScrects = [1, 2, 3, 4, 5]

const layout = {
    labelCol: { span: 8 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function Profile() {
    const navigation = useNavigation()
    const createUser = useStoreUser()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation()
    const [secretsForm] = Form.useForm();
    const [profileForm] = Form.useForm();

    const profileStore = useReadStoreProfile()

    const profile = useRef({
        name: profileStore.name,
        profilePicture: profileStore.profilePicture,
        background: profileStore.background,
        secret1: profileStore.secret1,
        secret2: profileStore.secret2,
        secret3: profileStore.secret3,
        secret4: profileStore.secret4,
        secret5: profileStore.secret5,
        collectedProfile: false,
        collectedSecrets: false,

    })

    const handleSecrets = (values: {
        secret1: string,
        secret2: string,
        secret3: string,
        secret4: string,
        secret5: string,
    }) => {

        profile.current = {
            ...profile.current,
            ...values,
            collectedSecrets: true
        }

    }

    const handleProfile = (values: {
        background: string,
        profilePicture: string,
        name: string,
    }) => {
        profile.current = {
            ...profile.current,
            ...values,
            collectedProfile: true
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        profile.current = {
            ...profile.current,
            collectedProfile: false, 
            collectedSecrets: false
        }
    }


    const onSave = () => {
        secretsForm.validateFields().then((res) => {
            handleSecrets(res)
        }).catch((err) => { })
        profileForm.validateFields().then((res) => {
            handleProfile(res)
        }).catch((err) => { })
    }

    useEffect(() => {
        if (profile.current.collectedProfile && profile.current.collectedSecrets) {
            createUser(profile.current).then(() => {
                setIsModalOpen(true)
            })
        }

    }, [createUser, profile])

    const onCancel = () => {
        navigation.navigateMainMenu()
    };

    const modalProps = {
        isModalOpen,
        handleOk: closeModal,
        handleCancel: closeModal,
        successMessage: t('profile_saved')
    }

    const profileProps = {
        displayNameLabel: t('display_name'),
        profileLabel: t('profile'),
        profilePictureLabel: t('profile_picture'),
        backgroundLabel: t('background'),
        form: profileForm,
        handleFinish: handleProfile,
        profile:profileStore

    }

    const secretsProps = {
        secretsLabel: t('secrets'),
        secretLabel: t('secret'),
        form: secretsForm,
        handleFinish: handleSecrets,
        profile:profileStore
    }

    return (
        <div className="p-4">
            <Space direction="vertical">
                <Space direction="horizontal">
                    <ProfileCard {...profileProps} />
                    <SecretsCard {...secretsProps} />
                </Space>

                <Space direction="horizontal">
                    <Button htmlType="button" onClick={onCancel}>
                        Cancel
                    </Button>

                    <Button type="primary" onClick={onSave}>
                        Save
                    </Button>
                </Space>
            </Space>

            <SaveStatusModal {...modalProps} />
        </div>
    )
}

interface ProfileCardProps {
    displayNameLabel: string,
    backgroundLabel: string,
    profileLabel: string,
    profilePictureLabel: string,
    handleFinish: (values: any) => void,
    form: FormInstance<any>,
    profile: Profile

}
function ProfileCard(props: ProfileCardProps) {
    const { displayNameLabel, profileLabel, backgroundLabel, profilePictureLabel } = props
    const { form, handleFinish, profile } = props

    return (
        <Card title={profileLabel} style={{ width: 400, height: "100%" }} suppressHydrationWarning>
            <Form
                {...layout}
                layout="vertical"
                name="profile-form"
                form={form}
                onFinish={handleFinish}
            >

                <Form.Item name="name" label={displayNameLabel} initialValue={profile.name} labelCol={labelCol} rules={[{ required: true }]} >
                    <Input style={{ fontSize: 24 }} />
                </Form.Item>


                <Form.Item name="profilePicture" label={profilePictureLabel} initialValue={profile.profilePicture} labelCol={labelCol} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="background" label={backgroundLabel} labelCol={labelCol} initialValue={profile.background} rules={[{ required: true }]}>
                    <Input.TextArea autoSize={{ minRows: 8, maxRows: 8 }} />
                </Form.Item>


            </Form>
        </Card>
    )
}


interface SecretsCardProps {
    secretsLabel: string,
    secretLabel: string,
    handleFinish: (values: any) => void,
    form: FormInstance<any>,
    profile: any

}
function SecretsCard(props: SecretsCardProps) {
    const { secretsLabel, secretLabel } = props
    const { form, handleFinish, profile } = props

    return (
        <Card title={secretsLabel} style={{ width: 400, height: "100%" }} suppressHydrationWarning>
            <Form
                {...layout}
                layout="vertical"
                name="secrets-form"
                form={form}
                onFinish={handleFinish}
            >

                {
                    numberOfScrects.map((_, index) => {
                        const key = `secret${index + 1}`
                        return (
                            <Form.Item className="w-full" key={key} name={key} initialValue={profile[key]} label={secretLabel} rules={[{ required: true }]}>
                                <Input className="w-full" />
                            </Form.Item>
                        )
                    })
                }

            </Form>
        </Card>
    )
}

interface SaveStatusModalProps {
    isModalOpen: boolean,
    handleOk: () => void,
    handleCancel: () => void,
    successMessage: string,
}
function SaveStatusModal({ isModalOpen, handleOk, successMessage }: SaveStatusModalProps) {


    return (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleOk}>

            <Space direction="horizontal">
                <CheckCircleOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
                <Typography.Title level={4}>{successMessage}</Typography.Title>
            </Space>

        </Modal>
    )
}