export interface RouterObj {
    path:string
    src:string
}
const list:RouterObj[] = [
    {
        path:'/',
        src:'Dashboard'
    },
    {
        path:'about',
        src:'AboutPage'
    }
]
export default list