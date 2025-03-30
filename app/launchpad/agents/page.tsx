"use client"
import React, { useState, useRef, useEffect } from "react"
import Image from "next/image";
import WordSvg from "@/public/launchpad/word.svg";
import localFont from 'next/font/local';
import FocusElizaIcon from "@/public/launchpad/focEliza.png";
import RightSvg from "@/public/launchpad/right.png";
import Card from "./card";
import Icon1 from "@/public/launchpad/icon/icon1.svg";
import Icon2 from "@/public/launchpad/icon/icon2.svg";
import Icon3 from "@/public/launchpad/icon/icon3.svg";
import Icon4 from "@/public/launchpad/icon/icon4.svg";
import Icon5 from "@/public/launchpad/icon/icon5.svg";
import { uploadAgentFile } from "@/app/api/launchpad";
import { getAgentDetail } from "@/app/api/launchpad";
import { useSearchParams } from 'next/navigation';
import { submitAgent, getRunTemplate, launchAgent } from "@/app/api/launchpad";
import {message} from 'antd';
import { Upload } from 'antd';
import type { UploadFile } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import UploadSvg from "@/public/launchpad/upload.svg";
import { getTaskListByGroup } from "@/app/api/cornerstone";
const myFont = localFont({
    src: '../neue-machina-regular.otf',
    display: 'swap',
});

export default function Home() {
    const searchParams = useSearchParams();
    const [selectedOption, setSelectedOption] = useState('fair');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [agentDetail, setAgentDetail] = useState<any>(null);
    const [agentId, setAgentId] = useState<number>(0);

    const [messageApi, contextHolder] = message.useMessage();
    const [tokenOption, setTokenOption] = useState('fair');
    const [engagementOption, setEngagementOption] = useState('none');
    const [storageOption, setStorageOption] = useState('artela');
    const [teeOption, setTeeOption] = useState('phala');

    const [formData, setFormData] = useState({
        agentName: '',
        tickerName: '',
        agentLogoUrl: '',
        id: agentId,
        character: {
            bio: [] as string[],
            lore: [] as string[],
            knowledge: [] as string[],
            topics: [] as string[],
            firstMessage: [] as string[]
        },
        agentConfig: {
            framework: 1,
            launchTokenOptions: 1,
            communityEngagement: 1,
            onChainStorage: 1,
            teeEnvironment: 1,
            aiExtension: [1] as number[]
        }
    });

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            setAgentId(parseInt(id));
            console.log(id,'id');
        } else {
            setAgentId(0);
            // Reset all states to initial values
            setAgentDetail(null);
            setSelectedOption('fair');
            setUploadedFile(null);
            
            // Reset all option states
            setTokenOption('fair');
            setEngagementOption('none');
            setStorageOption('artela');
            setTeeOption('phala');
            
            // Clear form data
            setFormData({
                agentName: '',
                tickerName: '',
                agentLogoUrl: '',
                id: 0,
                character: {
                    bio: [],
                    lore: [],
                    knowledge: [],
                    topics: [],
                    firstMessage: []
                },
                agentConfig: {
                    framework: 1,
                    launchTokenOptions: 1,
                    communityEngagement: 100,
                    onChainStorage: 1,
                    teeEnvironment: 1,
                    aiExtension: [1]
                }
            });
            
            // Clear file list
            setFileList([]);
        }
    }, [searchParams]);

    // Modify the effect to only run when searchParams changes
    useEffect(() => {
        if (searchParams.get('id')) {
            const id = parseInt(searchParams.get('id') || '0');
            setFormData(prev => ({
                ...prev,
                id: id
            }));
        }
    }, [searchParams]); // Only depend on searchParams

    // If you still want to log formData changes, create a separate effect
    useEffect(() => {
        console.log('Updated formData:', formData);
    }, [formData]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCharacterChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            character: {
                ...prev.character,
                [field]: value.split('\n')
            }
        }));
    };

    const handleConfigChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            agentConfig: {
                ...prev.agentConfig,
                [field]: value
            }
        }));
    };

    const handleOptionSelect = (field: string, option: string) => {
        switch(field) {
            case 'launchTokenOptions':
                setTokenOption(option);
                break;
            case 'communityEngagement':
                setEngagementOption(option);
                // Special case for communityEngagement values
                setFormData(prev => ({
                    ...prev,
                    agentConfig: {
                        ...prev.agentConfig,
                        [field]: option === 'none' ? 100 : 101
                    }
                }));
                return; // Exit early to avoid the default value setting below
            case 'onChainStorage':
                setStorageOption(option);
                break;
            case 'teeEnvironment':
                setTeeOption(option);
                break;
        }

        let value = 2;
        if (option === 'fair' || option === 'none' || 
            option === 'artela' || option === 'phala' || 
            option === 'focEliza') {
            value = 1;
        }

        setFormData(prev => ({
            ...prev,
            agentConfig: {
                ...prev.agentConfig,
                [field]: value
            }
        }));
    };

    const handleSubmit = async () => {
        try {
            const result = await submitAgent(formData);
            console.log('Form submitted successfully:', result);
            messageApi.success('Agent submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            messageApi.error('Failed to submit agent. Please try again.');
        }
    };
    const handleLaunch = async () => {
        try {
            console.log('Launching agent...');
            // const result = await launchAgent(2);
            const result = await getRunTemplate(agentId, '');
            console.log('Launch template result:', result);
            // Handle successful launch
            // You can add additional logic here based on the result
        } catch (error) {
            console.error('Error launching agent:', error);
            // Handle launch error
        }
    };

    const beforeUpload = (file: File) => {
        const isValidType = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'].includes(file.type);
        if (!isValidType) {
            message.error('You can only upload SVG, PNG, JPG or GIF files!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isValidType && isLt2M;
    };

    const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        // 确保新的文件列表中的文件包含预览URL
        const updatedFileList = newFileList.map(file => {
            if (file.status === 'done' && file.response) {
                // 如果文件上传完成，使用响应中的URL
                return {
                    ...file,
                    url: file.response, // 假设response直接是URL字符串
                    thumbUrl: file.response
                };
            }
            return file;
        });

        setFileList(updatedFileList);
        
        // 当文件上传完成时，更新 agentLogoUrl
        if (updatedFileList.length > 0 && updatedFileList[0].status === 'done') {
            const fileUrl = updatedFileList[0].response || updatedFileList[0].url;
            setFormData(prev => ({
                ...prev,
                agentLogoUrl: fileUrl
            }));
        } else {
            // 如果没有文件，清空 agentLogoUrl
            setFormData(prev => ({
                ...prev,
                agentLogoUrl: ''
            }));
        }
    };

    const customUpload = async ({ file, onSuccess, onError }: any) => {
        try {
            const result = await uploadAgentFile(file);
            if (result?.success && result?.url) {
                onSuccess(result.url); // 这将触发 handleChange
                setFormData(prev => ({
                    ...prev,
                    agentLogoUrl: result.url
                }));
            } else {
                onError(new Error('Upload failed'));
            }
        } catch (error) {
            onError(error);
            message.error('Upload failed');
        }
    };

    useEffect(() => {
        const fetchAgentDetail = async () => {
            const data = await getAgentDetail(agentId);
            setAgentDetail(data);
            console.log(data,'00--00');
            if (data) {
                // 如果有图片URL，创建一个文件列表项
                if (data.data.agentLogoUrl) {
                    setFileList([
                        {
                            uid: '-1',
                            name: 'image.png',
                            status: 'done',
                            url: data.data.agentLogoUrl,
                            thumbUrl: data.data.agentLogoUrl
                        }
                    ]);
                }

                setFormData(prev => ({
                    ...prev,
                    agentName: data.data.agentName || '',
                    tickerName: data.data.tickerName || '',
                    agentLogoUrl: data.data.agentLogoUrl || '',
                    character: {
                        bio: Array.isArray(data.data.character?.bio) ? data.data.character.bio : [],
                        lore: Array.isArray(data.data.character?.lore) ? data.data.character.lore : [],
                        knowledge: Array.isArray(data.data.character?.knowledge) ? data.data.character.knowledge : [],
                        topics: Array.isArray(data.data.character?.topics) ? data.data.character.topics : [],
                        firstMessage: Array.isArray(data.data.character?.firstMessage) ? data.data.character.firstMessage : []
                    },
                    agentConfig: {
                        framework: data.data.agentConfig?.framework || 1,
                        launchTokenOptions: data.data.agentConfig?.launchTokenOptions || 1,
                        communityEngagement: data.data.agentConfig?.communityEngagement || 100,
                        onChainStorage: data.data.agentConfig?.onChainStorage || 1,
                        teeEnvironment: data.data.agentConfig?.teeEnvironment || 1,
                        aiExtension: Array.isArray(data.data.agentConfig?.aiExtension) ? data.data.agentConfig.aiExtension : [1]
                    }
                }));

                // Update individual option states
                if (data.data.agentConfig) {
                    setTokenOption(data.data.agentConfig.launchTokenOptions === 1 ? 'fair' : 'private');
                    setEngagementOption(data.data.agentConfig.communityEngagement === 100 ? 'none' : 'X-Gifts');
                    setStorageOption(data.data.agentConfig.onChainStorage === 1 ? 'artela' : 'artela_ipfs');
                    setTeeOption(data.data.agentConfig.teeEnvironment === 1 ? 'phala' : '');
                }
            }
        };
        fetchAgentDetail();
    }, [agentId]);

    return (
        <div className="flex flex-col w-full sm:w-[1250px] bg-[#f6fbff]">
            {contextHolder}
            <div className="w-full flex flex-col justify-center items-center text-white font-bold text-[20px] sm:text-[28px] bg-[#0000C9] h-[200px] sm:h-[290px]">
                <div className={`flex justify-center items-center text-[32px] sm:text-[48px] ${myFont.className}`}>
                    Create an AI Agent
                </div>
                <div className="flex justify-center items-center text-[14px] sm:text-[16px] px-4 text-center">
                    Follow the steps to create your unique AI Agent
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-8 my-10 px-4 sm:px-0">
                <Card title="Select AI Framework" description="Select the framework for your AI Agent" icon="" index={1}>
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex gap-2 justify-between items-center border border-[#0000c9] text-black w-full md:w-1/2 p-2 rounded-lg">
                            <Image src={FocusElizaIcon} alt="Focus Eliza" width={80} height={80} />
                            <div className="flex flex-col w-full">
                                focEliza (Artela Exclusive)
                            </div>
                            <Image src={RightSvg} alt="Right" width={16} height={16} />
                        </div>
                        <div className="flex gap-2 justify-center items-center border border-[#0000001A] text-[#9EB7C7] text-lg font-semibold w-full md:w-1/2 p-2 rounded-lg">
                            Coming Soon
                        </div>
                    </div>
                </Card>

                <Card title="Define AI Agent Identity" description="define the AI agent Name" icon="" index={2}>
                    <div className="flex flex-col gap-2 mt-8">
                        <div className="flex flex-col md:flex-row gap-2 w-full">
                            <div className="flex flex-col gap-2 w-full md:w-1/2 text-sm font-semibold">
                                Agent Name
                                <input
                                    type="text"
                                    placeholder="Enter Agent Name"
                                    value={formData.agentName}
                                    onChange={(e) => handleInputChange('agentName', e.target.value)}
                                    className="w-full p-2 border bg-[#F5FBFF] border-[#0000001A] rounded-lg focus:outline-none focus:border-[#0000C9]"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full md:w-1/2 text-sm font-semibold">
                                Ticker Name
                                <input
                                    type="text"
                                    placeholder="Ticker Name"
                                    value={formData.tickerName}
                                    onChange={(e) => handleInputChange('tickerName', e.target.value)}
                                    className="w-full p-2 border bg-[#F5FBFF] border-[#0000001A] rounded-lg focus:outline-none focus:border-[#0000C9]"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-8">
                            <span className="text-sm font-semibold">AI AGENT IMAGE</span>
                            <span className="text-[12px] text-[#4B5563]">
                                Upload an image that represents your AI Agent. Make sure these images comply with our terms and community guidelines.
                                image (SVG, PNG, JPG, GIF)
                            </span>
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                                maxCount={1}
                                accept=".svg,.png,.jpg,.jpeg,.gif"
                                customRequest={customUpload}
                                className="!w-full [&_.ant-upload]:!w-full [&_.ant-upload]:!h-[200px] [&_.ant-upload]:!m-0 [&_.ant-upload]:!bg-[#F5FBFF] [&_.ant-upload-list-item]:!p-0 [&_.ant-upload-list-item]:!border-none"
                            >
                                {fileList.length >= 1 ? null : (
                                    <div className="flex flex-col items-center justify-center w-full h-full p-6 border-2 border-dashed border-[#E5E7EB] rounded-lg transition-all duration-200 hover:border-[#0000C9] hover:bg-[#F0F7FF]">
                                        <div className="flex flex-col items-center gap-4">
                                            <PlusOutlined className="text-2xl text-[#9CA3AF]" />
                                            <div className="text-center">
                                                <span className="text-[#FF5F15] font-medium cursor-pointer hover:underline">
                                                    Click to upload
                                                </span>
                                                <div className="mt-1 text-sm text-[#6B7280]">
                                                    SVG, PNG, JPG or GIF (max. 800x400px)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Upload>
                        </div>
                    </div>
                </Card>

                <Card title="Launch token Options" description="" icon="" index={3}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 text-sm font-semibold" >
                            LAUNCH OPTIONS
                        </div>
                        <div className="flex flex-col gap-4">
                            <div
                                className={`flex gap-4 items-center border ${tokenOption === 'fair' ? 'border-[#0000c9]' : 'border-[#0000001A]'} text-black w-full p-4 rounded-lg cursor-pointer`}
                                onClick={() => handleOptionSelect('launchTokenOptions', 'fair')}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 ${tokenOption === 'fair' ? 'border-[#0000c9]' : 'border-[#0000001A]'} flex items-center justify-center`}>
                                    {tokenOption === 'fair' && (
                                        <div className="w-4 h-4 rounded-full bg-[#0000c9]" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-semibold">No Token</div>
                                    <div className="text-sm text-gray-500">Launch your agent without associating it with a token initially. You can attach or launch a token later.</div>
                                </div>
                            </div>

                            <div
                                className="flex gap-4 items-center border border-[#0000001A] text-[#9EB7C7] w-full p-4 rounded-lg opacity-50 cursor-not-allowed"
                            >
                                <div className="w-6 h-6 rounded-full border-2 border-[#9EB7C7] flex items-center justify-center">
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-semibold">Fair Launch</div>
                                    <div className="text-sm">Your token will be launched randomly within a (3) hour time frame</div>
                                </div>
                            </div>

                            <div
                                className="flex gap-4 items-center border border-[#0000001A] text-[#9EB7C7] w-full p-4 rounded-lg opacity-50 cursor-not-allowed"
                            >
                                <div className="w-6 h-6 rounded-full border-2 border-[#9EB7C7] flex items-center justify-center">
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-semibold">Use Existing Token</div>
                                    <div className="text-sm">This requires users to provide the address of an existing token.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card title="AI Characters Options" tooltip="View Demo" description="" icon="" index={4}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-semibold">bio</div>
                            <textarea
                                placeholder="Enter role description (max 280 characters)"
                                value={Array.isArray(formData.character.bio) ? formData.character.bio.join('\n') : ''}
                                onChange={(e) => handleCharacterChange('bio', e.target.value)}
                                className="w-full p-2 h-[120px] border bg-[#F5FBFF] border-[#0000001A] rounded-lg focus:outline-none focus:border-[#0000C9] resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-semibold">lore</div>
                            <textarea
                                placeholder="First message for interactions"
                                value={Array.isArray(formData.character.lore) ? formData.character.lore.join('\n') : ''}
                                onChange={(e) => handleCharacterChange('lore', e.target.value)}
                                className="w-full p-2 h-[120px] border bg-[#F5FBFF] border-[#0000001A] rounded-lg focus:outline-none focus:border-[#0000C9] resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-semibold">knowledge</div>
                            <textarea
                                placeholder="Background story (optional)"
                                value={Array.isArray(formData.character.knowledge) ? formData.character.knowledge.join('\n') : ''}
                                onChange={(e) => handleCharacterChange('knowledge', e.target.value)}
                                className="w-full p-2 h-[120px] border bg-[#F5FBFF] border-[#0000001A] rounded-lg focus:outline-none focus:border-[#0000C9] resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-semibold">topics</div>
                            <textarea
                                placeholder="Background story (optional)"
                                value={Array.isArray(formData.character.topics) ? formData.character.topics.join('\n') : ''}
                                onChange={(e) => handleCharacterChange('topics', e.target.value)}
                                className="w-full p-2 h-[120px] border bg-[#F5FBFF] border-[#0000001A] rounded-lg focus:outline-none focus:border-[#0000C9] resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-semibold">FIRST MESSAGE</div>
                            <textarea
                                placeholder="Write the first message your AI Agent will send."
                                value={Array.isArray(formData.character.firstMessage) ? formData.character.firstMessage.join('\n') : ''}
                                onChange={(e) => handleCharacterChange('firstMessage', e.target.value)}
                                className="w-full p-2 h-[120px] border bg-[#F5FBFF] border-[#0000001A] rounded-lg focus:outline-none focus:border-[#0000C9] resize-none"
                            />
                        </div>
                    </div>
                </Card>

                <Card title="Unlock AI Extensions" description="" icon="" index={5}>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center p-4 border border-[#0000c9] rounded-lg bg-[#F5FBFF]">
                            <div className="flex gap-4 items-center">
                                <Image src={Icon1} alt="Icon 1" width={20} height={20} />
                                <div>
                                    <div className="font-semibold">Twitter Integration</div>
                                    <div className="text-sm text-gray-500">Post, reply, and interact</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full border-2 border-[#0000c9] flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-[#0000c9]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center p-4 border border-[#0000001A] rounded-lg opacity-50 cursor-not-allowed">
                            <div className="flex gap-4 items-center">
                                <Image src={Icon2} alt="Icon 2" width={20} height={20} />
                                <div>
                                    <div className="font-semibold">Telegram Integration</div>
                                    <div className="text-sm text-gray-500">Interact on Telegram</div>
                                </div>
                            </div>
                            <div className="text-gray-500">Coming Soon</div>
                        </div>

                        <div className="flex justify-between items-center p-4 border border-[#0000001A] rounded-lg opacity-50 cursor-not-allowed">
                            <div className="flex gap-4 items-center">
                                <Image src={Icon3} alt="Icon 3" width={20} height={20} />
                                <div>
                                    <div className="font-semibold">Discord Integration</div>
                                    <div className="text-sm text-gray-500">Configure your AI agent's Discord presence</div>
                                </div>
                            </div>
                            <div className="text-gray-500">Coming Soon</div>
                        </div>

                        <div className="flex justify-between items-center p-4 border border-[#0000001A] rounded-lg opacity-50 cursor-not-allowed">
                            <div className="flex gap-4 items-center">
                                <Image src={Icon4} alt="Icon 4" width={20} height={20} />
                                <div>
                                    <div className="font-semibold">Agent Training</div>
                                    <div className="text-sm text-gray-500">Custom AI training</div>
                                </div>
                            </div>
                            <div className="text-gray-500">Coming Soon</div>
                        </div>

                        <div className="flex justify-between items-center p-4 border border-[#0000001A] rounded-lg opacity-50 cursor-not-allowed">
                            <div className="flex gap-4 items-center">
                                <Image src={Icon5} alt="Icon 5" width={20} height={20} />
                                <div>
                                    <div className="font-semibold">Video Generation</div>
                                    <div className="text-sm text-gray-500">Create video content</div>
                                </div>
                            </div>
                            <div className="text-gray-500">Coming Soon</div>
                        </div>
                    </div>
                </Card>

                <Card title="Unlock AI Extensions for Community" description="" icon="" index={6}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 text-sm font-semibold" >
                            ENGAGEMENT OPTIONS
                        </div>
                        <div className="flex flex-col gap-4">
                            <div
                                className={`flex gap-4 items-center border ${engagementOption === 'none' ? 'border-[#0000c9]' : 'border-[#0000001A]'} text-black w-full p-4 rounded-lg cursor-pointer`}
                                onClick={() => handleOptionSelect('communityEngagement', 'none')}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 ${engagementOption === 'none' ? 'border-[#0000c9]' : 'border-[#0000001A]'} flex items-center justify-center`}>
                                    {engagementOption === 'none' && (
                                        <div className="w-4 h-4 rounded-full bg-[#0000c9]" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-semibold">None</div>
                                </div>
                            </div>

                            <div
                                className={`flex gap-4 items-center border ${engagementOption === 'X-Gifts' ? 'border-[#0000c9]' : 'border-[#0000001A]'} text-black w-full p-4 rounded-lg cursor-pointer`}
                                onClick={() => handleOptionSelect('communityEngagement', 'X-Gifts')}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 ${engagementOption === 'X-Gifts' ? 'border-[#0000c9]' : 'border-[#0000001A]'} flex items-center justify-center`}>
                                    {engagementOption === 'X-Gifts' && (
                                        <div className="w-4 h-4 rounded-full bg-[#0000c9]" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-semibold">X-Gifts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card title="On Chain Storage" description="" icon="" index={7}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 text-sm font-semibold" >
                            Storage Method
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div 
                                className={`flex gap-4 items-center border ${storageOption === 'artela' ? 'border-[#0000c9]' : 'border-[#0000001A]'} text-black w-full md:w-1/2 p-4 rounded-lg cursor-pointer`}
                                onClick={() => handleOptionSelect('onChainStorage', 'artela')}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 ${storageOption === 'artela' ? 'border-[#0000c9]' : 'border-[#0000001A]'} flex items-center justify-center`}>
                                    {storageOption === 'artela' && (
                                        <div className="w-4 h-4 rounded-full bg-[#0000c9]" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-semibold">Artela Network</div>
                                </div>
                            </div>

                            <div 
                                className={`flex gap-4 items-center border ${storageOption === 'artela_ipfs' ? 'border-[#0000c9]' : 'border-[#0000001A]'} text-black w-full md:w-1/2 p-4 rounded-lg cursor-pointer`}
                                onClick={() => handleOptionSelect('onChainStorage', 'artela_ipfs')}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 ${storageOption === 'artela_ipfs' ? 'border-[#0000c9]' : 'border-[#0000001A]'} flex items-center justify-center`}>
                                    {storageOption === 'artela_ipfs' && (
                                        <div className="w-4 h-4 rounded-full bg-[#0000c9]" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-semibold">ArtelaNetwork&IPFS</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card title="TEE Environment" description="" icon="" index={8}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 text-sm font-semibold" >
                            TEE Method
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div 
                                className={`flex gap-4 items-center border ${teeOption === 'phala' ? 'border-[#0000c9]' : 'border-[#0000001A]'} text-black w-full md:w-1/2 p-4 rounded-lg cursor-pointer`}
                                onClick={() => handleOptionSelect('teeEnvironment', 'phala')}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 ${teeOption === 'phala' ? 'border-[#0000c9]' : 'border-[#0000001A]'} flex items-center justify-center`}>
                                    {teeOption === 'phala' && (
                                        <div className="w-4 h-4 rounded-full bg-[#0000c9]" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-semibold">Phala</div>
                                </div>
                            </div>

                            <div className="flex gap-4 items-center border border-[#0000001A] text-[#9EB7C7] w-full md:w-1/2 p-4 rounded-lg">
                                <div className="flex flex-col">
                                    <div className="font-semibold">more coming soon</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card title="" description="" icon="">
                    <div className="flex flex-col gap-6">
                        {/* <div className="flex flex-col gap-2">
                            <div className="text-sm font-semibold">Invitation Code</div>
                            <input
                                type="text"
                                placeholder="Enter your invite code here"
                                className="w-full p-4 border bg-[#F5FBFF] border-[#0000001A] rounded-lg focus:outline-none focus:border-[#0000C9]"
                            />
                        </div> */}

                        <button 
                            onClick={handleSubmit}
                            className="w-full bg-[#FF5F15] text-white py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90"
                        >
                            Submit
                        </button>
                        {/* <button 
                            onClick={handleLaunch}
                            className="w-full bg-[#FF5F15] text-white py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90"
                        >
                            Launch
                        </button> */}

                        <p className="text-sm text-gray-600">
                            To request an invitation code, please fill out the contact form below. Our team will review your request and provide you with a code if eligible. Stay tuned for additional payment methods coming soon!
                        </p>
                    </div>
                </Card>

            </div>
        </div>
    );
}
