"use client"
import React, { useState, useRef, useEffect } from "react"
import Image from "next/image";
import WordSvg from "@/public/launchpad/word.svg";
import BgSvg from "@/public/launchpad/bg.png";
import RightArrowSvg from "@/public/launchpad/rightarrow.svg";
import HeadSvg from "@/public/launchpad/head.png";
import GithubSvg from "@/public/launchpad/github.svg";
import Image1 from "@/public/launchpad/image1.png";
import PlusSvg from "@/public/launchpad/plus.svg";
import { getAgentList } from "@/app/api/launchpad";
import { useRouter } from 'next/navigation';
import { Modal, Button, Form, Input } from 'antd';
import { getRunTemplate, launchAgent,getMyAgents } from "@/app/api/launchpad";
import { message } from 'antd';
import { useAccount } from 'wagmi';

export default function Home() {
    const [agentList, setAgentList] = useState([]);
    const [myAgents, setMyAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [templateData, setTemplateData] = useState<any>(null);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();
    const { isConnected } = useAccount();

    useEffect(() => {
        getAgentList().then(
            (data) => {
                setAgentList(data.data);
                console.log(data, '--===0000');
            }
        );
        getMyAgents().then(
            (data) => {
                setMyAgents(data.data || []);
            }
        );
    }, [isConnected]);

    const showModal = async (agent: any, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedAgent(agent);
        try {
            const response = await getRunTemplate(agent.id, '');
            if (response.success && response.data['Twitter Integration Config']) {
                setTemplateData(response.data['Twitter Integration Config']);
                form.setFieldsValue(response.data['Twitter Integration Config']);
            }
        } catch (error) {
            console.error('Error fetching template:', error);
        }
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const data = {
                agentId: selectedAgent.id,
                code: values.code,
                env: {
                    "1": values
                }
            }
            const response = await launchAgent(data);
            console.log(response, 'response');
            if (response) {
                // Redirect to the agent detail page
                messageApi.success('Launch Success');
                setIsModalOpen(false);
                getMyAgents().then(
                    (data) => {
                        setMyAgents(data.data || []);
                    }
                );
            }
        } catch (error) {
            console.error('Launch failed:', error);
            messageApi.error('Launch Failed');
          
            return;
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCreateAgent = () => {
        if (!isConnected) {
            messageApi.warning('Please connect your wallet first');
            return;
        }
        router.push('/launchpad/agents');
    };

    return (
        <div className="overflow-x-hidden w-full sm:w-[1250px] p-4 sm:p-8 flex flex-col justify-start items-start">
            {contextHolder}
            <div className="flex flex-col justify-center items-center w-full">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-24">
                    <div className="flex flex-col justify-center items-start gap-4 sm:gap-8">
                        <div className="flex flex-col justify-center items-start">
                            <Image src={WordSvg} alt="Word" width={698} height={148} className="w-full sm:w-auto" />
                            <div className="text-sm sm:text-base">
                                Explore, create, and manage AI agents with ease
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-8 w-full">
                            <button 
                                onClick={handleCreateAgent}
                                className="w-full sm:w-auto bg-[#ED4E00] flex justify-center items-center text-white px-4 py-2 rounded-sm hover:bg-[#FF5500] transition-colors"
                            >
                                Create AI Agent
                                <Image src={RightArrowSvg} alt="Right Arrow" width={15} height={16} className="ml-2 brightness-0 invert" />
                            </button>
                            <button className="w-full sm:w-auto border border-[#000014] flex justify-center items-center text-[#000014] px-4 py-2 rounded-sm hover:bg-gray-50 transition-colors">
                                Why Onchain AI agent
                                <Image src={RightArrowSvg} alt="Right Arrow" width={15} height={16} className="ml-2" />
                            </button>
                        </div>
                    </div>
                    <div className="hidden sm:block">
                        <Image src={BgSvg} alt="Background" width={320} height={360} />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-6 py-4 items-center w-full border-1 border-black rounded-sm mt-4 sm:mt-0">
                    <Image src={HeadSvg} alt="Head" width={127} height={107} className="w-20 sm:w-auto" />
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full sm:w-[90%]">
                        <div className="flex flex-col justify-center items-center sm:items-start gap-2">
                            <div className="text-[#000014] text-xl sm:text-2xl font-medium text-center sm:text-left">
                                Overview of Fully On-Chain AI Agents
                            </div>
                            <div className="text-[#000014] text-xs sm:text-sm font-medium text-center sm:text-left">
                                Learn about TEE security, verifiability, interoperability
                            </div>
                        </div>
                        <div>
                            <button className="border border-[#000014] flex justify-center items-center text-[#000014] px-2 py-1 rounded hover:bg-gray-50 transition-colors">
                                <Image src={GithubSvg} alt="Github" className="mr-2" width={20} height={20} />
                                Github
                                <Image src={RightArrowSvg} alt="Right Arrow" width={15} height={16} className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full mt-8">
                {agentList.map((agent: any, index: number) => (
                    <div
                        onClick={() => {
                            router.push(`/launchpad/agents?id=${agent.id}`);
                        }}
                        key={index} className="flex flex-col cursor-pointer justify-center items-start border border-[#0000001A] hover:border-[#0000c9] rounded-xl p-4 transition-all">
                        <Image
                            src={agent.agentLogoUrl?.startsWith('https') ? agent.agentLogoUrl : `/${agent.agentLogoUrl}` || Image1}
                            alt={`Agent ${index + 1}`}
                            width={260}
                            height={240}
                            className="w-full object-cover rounded-lg"
                        />
                        <div className="text-base font-medium px-2 py-3">
                            {agent.agentName || "Recommended AI Agents"}
                        </div>
                        <div className="flex justify-between items-center w-full px-2">
                            <div className="flex gap-4">
                                {agent.twitterUrl && (
                                    <a
                                        href={agent.twitterUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#666] hover:text-[#ED4E00] text-sm transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Twitter
                                    </a>
                                )}
                                {agent.teeVerifyUrl && (
                                    <a
                                        href={agent.teeVerifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#666] hover:text-[#ED4E00] text-sm transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        TEE Verify
                                    </a>
                                )}
                            </div>
                            <div>
                                {agent.runStatus === 1 && (
                                    <span className="text-green-600">Running</span>
                                )}
                                {agent.runStatus === 2 && (
                                    <span className="text-blue-600">Starting</span>
                                )}
                                {agent.runStatus === 3 && (
                                    <span className="text-gray-600">Closed</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col justify-between items-start w-full mt-8 gap-8">
                <div className="flex justify-start items-start font-bold text-[28px]">
                    My AI Agents
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full">
                    {myAgents.map((agent: any, index: number) => (
                    // {agentList.map((agent: any, index: number) => (
                        <div
                            onClick={() => {
                                router.push(`/launchpad/agents?id=${agent.id}`);
                            }}
                            key={index} 
                            className="flex flex-col cursor-pointer justify-center items-start border border-[#0000001A] hover:border-[#0000c9] rounded-xl p-4 transition-all"
                        >
                            <Image
                                src={agent.agentLogoUrl?.startsWith('https') ? agent.agentLogoUrl : `/${agent.agentLogoUrl}` || Image1}
                                alt={`Agent ${index + 1}`}
                                width={260}
                                height={240}
                                className="w-full object-cover rounded-lg"
                            />
                            <div className="text-base font-medium px-2 py-3">
                                {agent.agentName || "My AI Agent"}
                            </div>
                            <div className="flex justify-between items-center w-full px-2">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex gap-4">
                                        {agent.twitterUrl && (
                                            <a
                                                href={agent.twitterUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#666] hover:text-[#ED4E00] text-sm transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Twitter
                                            </a>
                                        )}
                                        {agent.teeVerifyUrl && (
                                            <a
                                                href={agent.teeVerifyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#666] hover:text-[#ED4E00] text-sm transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                TEE Verify
                                            </a>
                                        )}
                                    </div>
                                    <div>
                                        {agent.runStatus === 1 && (
                                            <span className="text-green-600">Running</span>
                                        )}
                                        {agent.runStatus === 2 && (
                                            <span className="text-blue-600">Starting</span>
                                        )}
                                        {agent.runStatus === 3 && (
                                            <span className="text-gray-600">Closed</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-2 mt-2">
                                <Button
                                    type="primary"
                                    onClick={(e) => showModal(agent, e)}
                                    className="bg-[#ED4E00] hover:bg-[#FF5500] w-full"
                                >
                                    Launch
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div 
                        className="flex flex-col cursor-pointer justify-center items-start border border-dashed border-gray-300 hover:border-[#0000c9] rounded-xl p-4 transition-all"
                        onClick={handleCreateAgent}
                    >
                        <div className="w-full h-[240px] flex justify-center items-center">
                            <div className="flex justify-center items-center flex-col gap-4">
                                <Image src={PlusSvg} alt="Plus" width={44} height={43} />
                                <span className="text-base">Create your AI Agent</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                title={selectedAgent?.agentName || "Launch Agent"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Launch"
                cancelText="Cancel"
                width={600}
                okButtonProps={{
                    style: { backgroundColor: '#ED4E00' }
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    className="mt-4"
                >
                    {templateData && Object.entries(templateData).map(([key, value]) => (
                        <Form.Item
                            key={key}
                            label={key.replace(/_/g, ' ')}
                            name={key}
                            rules={[{ required: true, message: `Please input ${key.replace(/_/g, ' ').toLowerCase()}!` }]}
                        >
                            <Input
                                placeholder={`Enter ${key.toLowerCase()}`}
                                className="w-full"
                            />
                        </Form.Item>
                    ))}
                    <Form.Item 
                        label="Invitation Code" 
                        name="code"
                        rules={[{ required: true, message: 'Please input invitation code!' }]}
                    >
                        <Input placeholder="Enter Code" className="w-full" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
