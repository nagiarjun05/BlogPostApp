const logout=document.getElementById('logout');
const authorList=document.getElementById('auth-list');
const recentBLogs=document.getElementById('recent-blogs');
const account=document.getElementById('account');
const createBlog=document.getElementById('create-blog');
const parent_element=document.querySelector('body');
const authPagination=document.getElementById('author-pagination');
const blogPagination=document.getElementById('blog-pagination');
const token=localStorage.getItem('token');


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
        headers:{'Authorization':token}
    })
    .then(res=>{
        authorList.innerHTML='';
        res.data.Users.forEach(element => {
            var li = document.createElement('li');
            const id=element.id;
            li.className='auth-item';
            const name=element.name.split(' ').map(item=>{
                return item.slice(0,1).toUpperCase()+item.slice(1)
            }).join(' ');
            li.innerHTML=`<a class="authors" id="auth${element.id}">${name}</a>`;
            authorList.appendChild(li);
        });
        pagination(res.data.currentPage,res.data.hasNextPage,res.data.nextPage,res.data.hasPreviousPage,res.data.previousPage,authPagination,showAuthers)
    })
    .catch(err=>console.log(err))
}

const showRecentBlogs=function(page){
    axios({
        method:'get',
        url: `http://localhost:8080/home/blogs?page=${page}`,
        headers:{'Authorization':token}
    })
    .then(res=>{
        recentBLogs.innerHTML='';
        if(res.data.Blogs!=undefined){
            res.data.Blogs.forEach(element => {
                var li = document.createElement('li');
                li.className='blog-item';
                const title=element.title.split(' ').map(item=>{
                    return item.slice(0,1).toUpperCase()+item.slice(1)
                }).join(' ');
                const author=element.author.split(' ').map(item=>{
                    return item.slice(0,1).toUpperCase()+item.slice(1)
                }).join(' ');
                li.innerHTML=`<a class="blogs" id="blog${element.id}">"${title}" by ${author}</a>`;

                recentBLogs.appendChild(li);
                });
                pagination(res.data.currentPage,res.data.hasNextPage,res.data.nextPage,res.data.hasPreviousPage,res.data.previousPage,blogPagination,showRecentBlogs)
            }
    })
    .catch(err=>console.log(err))
}


parent_element.addEventListener('click',(e)=>{
    e.preventDefault()
    if(e.target.className==='blogs'){
        const blogId=e.target.id.slice(4)
        localStorage.setItem('blogId',blogId)
        window.location.href=`/blog.html`
    }else if(e.target.className==='authors'){
        const authId=e.target.id.slice(4)
        localStorage.setItem('authId',authId)
        window.location.href=`/blog.html`
    }
});


createBlog.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href='/blog.html'
    localStorage.removeItem('authId')
    localStorage.removeItem('blogId')
});

account.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href='/account.html'
});


logout.addEventListener('click',(e)=>{
    localStorage.removeItem('token');
    window.location.href='/login.html'
});



function pagination(currentPage,hasNextPage,nextPage,hasPreviousPage,previousPage,pages,cb){
    pages.innerHTML='';
    if (hasPreviousPage){
        const prevBtn=document.createElement('button')
        prevBtn.innerHTML=previousPage;
        pages.appendChild(prevBtn);
        prevBtn.addEventListener('click',()=>{
            cb(previousPage)
            });
    };
    
    const curBtn=document.createElement('button')
    curBtn.innerHTML=currentPage;
    pages.appendChild(curBtn);
    curBtn.addEventListener('click',(e)=>{        
        cb(currentPage)
    });

    if (hasNextPage){
        const nexBtn=document.createElement('button')
        nexBtn.innerHTML=nextPage;
        pages.appendChild(nexBtn);
        nexBtn.addEventListener('click',()=>{
            cb(nextPage)
            });
    };
};