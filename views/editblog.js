const logout=document.getElementById('logout');
const home=document.getElementById('home');

const title=document.getElementById("title");
const content=document.getElementById("content");
const blogpost=document.getElementById("blogpost");
const blogId=localStorage.getItem('blogId');
const token=localStorage.getItem('token');

window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    getBlogDetail(blogId)
});

blogpost.addEventListener('click',async (e)=>{
    try{
        e.preventDefault();
        if (!title.value||!content.value){
            return alert("Please filled all details about blog")
        }
        const  Title=title.value;
        const  Content=content.value;
        
        const res=await axios({
            method:'patch',
            url:`http://localhost:8080/blog/editblog`,
            data:{
                title: Title,
                content: Content,
                blogId:blogId
            },
            headers:{'Authorization':token}
            }
        )
        alert(res.data.message);
        window.location.href="./home.html"
    }
    catch(err){
        if (err.response.status === 400) {
            alert(err.response.data.message);
        } else if (err.response.status === 403) {
            alert(err.response.data.message);
        } else if (err.response.status === 500) {
            alert(err.response.data.message);
        } else {
            showError(err)
        }};
});


const getBlogDetail=function(blogId){
    axios({
        method:'get',
        url: `http://localhost:8080/blog/getblog?blogId=${blogId}`,
        headers:{'Authorization':token}
    })
    .then(res=>{
        title.value=res.data.blog.title;
        content.value=res.data.blog.content;
    })
    .catch(err=>console.log(err))
};

home.addEventListener('click',(e)=>{
    e.preventDefault()
    localStorage.removeItem('blogId');
    window.location.href='/home.html'
});

logout.addEventListener('click',(e)=>{
    localStorage.removeItem('blogId');
    window.location.href='/login.html'
});