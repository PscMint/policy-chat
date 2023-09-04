import {MockResParams} from './typing'
import parsePars from './utils'

export default [
    {
        url: '/chat',
        type: 'post',
        response: (data: MockResParams) => {
            // console.log(data)
            const question = parsePars(data).question
            //简单的回复模拟
            let answer: any =
                {
                    question: question,
                    response: question.includes('户口') ?
                        "户口是指公民在中华人民共和国境内依法享有居住权的人口登记和户口管理。户口登记是公民依法享受国家和社会福利、承担相应义务的重要证明。根据我国的户口制度，公民的户口登记分为农村户口和城市户口。农村户口主要是指农村居民，城市户口主要是指城市居民。\n\n户口的变更主要有以下几种情况：\n\n1. 因工作、学习、生活等原因，从农村户口迁移到城市户口。\n2. 从城市户口迁移到农村户口。\n3. 因离婚、丧偶等原因，户口发生变更。\n4. 因继承、遗赠等原因，户口发生变更。\n\n需要注意的是，户口迁移需要向户口登记机关提出申请，并提交相关证明材料。在办理户口迁移手续时，应确保提供真实、准确的信息，以便顺利办理手续。"
                        : '不知道呢，等会再问吧，:-(\n\nP.S.答案数据mock未进行模拟',
                    history: [],
                    source_documents: ["出处：mock模拟数据"]
                }
            return answer
        }
    }
];
