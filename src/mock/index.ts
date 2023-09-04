import Mock from 'mockjs';
import policy from './policy';
import chat from './chat'
import {MockParams} from './typing'

const mocks = [
    ...policy,
    ...chat

]

//设置延时时间
Mock.setup({
    timeout: "300",
});

export function mockXHR() {
    let i: MockParams;
    for (i of mocks) {
        Mock.mock(new RegExp(i.url), i.type || "get", i.response);
    }
}

