import { useNavigateMainMenu } from "@/lib/navigation-hooks";
import {useStoreUser} from "@/lib/sdk";
import CheckCircleOutlined from "@ant-design/icons/lib/icons/CheckCircleOutlined";
import { Button, Card, Form, FormInstance, Input, Modal, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useReadStoreProfile } from "@/hooks/useProfile";
import { Profile } from "@/domain/profile";


const numberOfScrects = [1, 2, 3, 4, 5]

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function Profile() {
    const navigation = useNavigateMainMenu()
    const createUser  = useStoreUser()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation()
    const [secretsForm] = Form.useForm();
    const [profileForm] = Form.useForm();

    const profileStore = useReadStoreProfile()

    const [profile, setProfile] = useState({
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
        setProfile((oldState) => ({
            ...oldState,
            ...values,
            collectedSecrets: true
        })
        )
    }

    const handleProfile = (values: {
        background: string,
        profilePicture: string,
        name: string,
    }) => {
        setProfile((oldState) => ({
            ...oldState,
            ...values,
            collectedProfile: true
        }))
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setProfile((oldState) => ({...oldState, collectedProfile: false, collectedSecrets: false}))
    }


    const onSave = () => {
        secretsForm.validateFields().then((res) => {
            handleSecrets(res)
        }).catch((err) => {})
        profileForm.validateFields().then((res) => {
            handleProfile(res)
        }).catch((err) => {})
    }

    useEffect(() => {
        if (profile.collectedProfile && profile.collectedSecrets) {
            createUser(profile).then(() => {
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
        profile

    }

    const secretsProps = {
        secretsLabel: t('secrets'),
        secretLabel: t('secret'),
        form: secretsForm,
        handleFinish: handleSecrets,
        profile
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
    profile : Profile

}
function ProfileCard(props: ProfileCardProps) {
    const { displayNameLabel, profileLabel, backgroundLabel, profilePictureLabel } = props
    const { form, handleFinish,profile } = props
    return (
        <Card title={profileLabel} style={{ width: 400, height: "35rem" }} suppressHydrationWarning>
            <Form
                {...layout}
                layout="vertical"
                name="profile-form"
                form={form}
                onFinish={handleFinish}
            >

                <Form.Item name="name" label={displayNameLabel} rules={[{ required: true }]}>
                    <Input defaultValue={profile.name}/>
                </Form.Item>


                <Form.Item name="profilePicture" label={profilePictureLabel} rules={[{ required: true }]}>
                    <Input defaultValue={profile.profilePicture}/>
                </Form.Item>

                <Form.Item name="background" label={backgroundLabel} rules={[{ required: true }]}>
                    <Input.TextArea rows={4} defaultValue={profile.background}/>
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
    const { form, handleFinish,profile } = props

    return (
        <Card title={secretsLabel} style={{ width: 400, height: "35rem" }} suppressHydrationWarning>
            <Form
                {...layout}
                layout="vertical"
                name="secrets-form"
                form={form}
                onFinish={handleFinish}
            >

                {
                    numberOfScrects.map((_, index) => {
                        const key = `secret${index}`
                        return (
                            <Form.Item key={key} name={key} label={secretLabel} rules={[{ required: true }]}>
                                <Input defaultValue={profile[key]} />
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