const logout=document.getElementById('logout');
const autherList=document.getElementById('auth-list');
const recentBLogs=document.getElementById('recent-blogs');
const account=document.getElementById('account');
const createBlog=document.getElementById('create-blog');


window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    console.log("content loading")
    const page=1;
    showAuthers(page)
    showRecentBlogs(page)
});


const showAuthers=function(page){
    axios({
        method:'get',
        url: `http://localhost:8080/home/authers?page=${page}`,
        // headers:{'Authorization':token}
    })
    .then(res=>{
        console.log(res.data.Users)
    })
    .catch(err=>console.log(err))
}

const showRecentBlogs=function(page){
    axios({
        method:'get',
        url: `http://localhost:8080/home/blogs?page=${page}`,
        // headers:{'Authorization':token}
    })
    .then(res=>{
        console.log(res.data.Blogs)
    })
    .catch(err=>console.log(err))
}

createBlog.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href='/blog.html'
});

account.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href='/account.html'
});


logout.addEventListener('click',(e)=>{
    localStorage.removeItem('token');
    window.location.href='/login.html'
});