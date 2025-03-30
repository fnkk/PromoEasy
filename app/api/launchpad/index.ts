import xfetch from '@/utils/xfetch';

const getAgentList = async () => {
    try {
        const response = await xfetch(`/launchpad/api/launch/agent/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching agent list:', error);
        throw error;
    }
}

const uploadAgentFile = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/launchpad/api/launch/agent/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading agent file:', error);
        throw error;
    }
}

const getAgentDetail = async (agentId: string | number) => {
    try {
        const response = await xfetch(`/launchpad/api/launch/agent/detail?agentId=${agentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching agent detail:', error);
        throw error;
    }
}

const submitAgent = async (formData: any) => {
    try {
        const response = await xfetch('/launchpad/api/launch/agent/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting agent:', error);
        throw error;
    }
}

const getRunTemplate = async (agentId: string | number, code: string | number) => {
    try {
        const response = await xfetch(`/launchpad/api/launch/agent/run_tmpl?agentId=${agentId}&code=${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching run template:', error);
        throw error;
    }
}

const launchAgent = async (launchData: any) => {

    try {
        const response = await xfetch('/launchpad/api/launch/agent/launch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(launchData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error launching agent:', error);
        throw error;
    }
}

const getMyAgents = async () => {
    try {
        const response = await xfetch('/launchpad/api/launch/agent/my', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching my agents:', error);
        throw error;
    }
}

export { getAgentList, uploadAgentFile, getAgentDetail, submitAgent, getRunTemplate, launchAgent, getMyAgents };
