import { Button, Card, Layout, Space, Typography } from "antd"
import { useTranslation } from "next-i18next"
import { useState } from "react"
import RulesContent from "./RulesContent"
import RulesDrawer from "./RulesDrawer"


export default function Rules() {
    const { t } = useTranslation('rules')



    const [selectedKey, setSelectedKey] = useState<string>("generalRulesArray")
    const rules = Array<Array<{ rule: string, id: number }>>(t(selectedKey, { returnObjects: true }))
    return (
        <Layout className="w-full h-full">
            <Layout.Sider>
                <RulesDrawer selectedKey={selectedKey} onClick={setSelectedKey} />
            </Layout.Sider>
            <Layout.Content className="flex flex-col justify-center p-4">
                <RulesContent rules={rules}/>
            </Layout.Content>
        </Layout>
    )
}