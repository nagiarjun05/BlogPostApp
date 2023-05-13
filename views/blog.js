const logout=document.getElementById('logout');
const home=document.getElementById('home');

const title=document.getElementById("title");
const content=document.getElementById("content");
const blogpost=document.getElementById("blogpost");

const mainContainer=document.getElementById('main-blog');
const blogsByAuthor=document.getElementById('auth-blogs-container');
const blogPagination=document.getElementById('blog-pagination');

const blogId=localStorage.getItem('blogId')
const authId=localStorage.getItem('authId')
const token=localStorage.getItem('token');

window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    console.log("content loading")
    if(blogId!=undefined) {
        document.getElementById('blog-editing').style.display='none';
        getBlogDetail(blogId)
    }else if(authId!=undefined){
        document.getElementById('blog-editing').style.display='none';
        const page=1;  
        getBlogsByAuth(authId,page);
    }
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
            method:'post',
            url:`http://localhost:8080/blog/postblog`,
            data:{
                title: Title,
                content: Content
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
        console.log(res.data.blog)
        mainContainer.innerHTML=`
        <h1 id="blogTitle">Title  "${res.data.blog.title}"</h1>
        <h2 id="authorName">By  ${res.data.blog.author}</h2>
        <p id="blogContent">"${res.data.blog.content}"</p>`
    })
    .catch(err=>console.log(err))
};

const getBlogsByAuth=function(authId,page){
    axios({
        method:'get',
        url: `http://localhost:8080/blog/getauthblog?authId=${authId}&page=${page}`,
        headers:{'Authorization':token}
    })
    .then(res=>{
        if(res.data.Blogs!=undefined){
            document.getElementById('auth-detail').textContent=`Blogs by ${res.data.User.name}`
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

                blogsByAuthor.appendChild(li);
                });
                pagination(res.data.currentPage,res.data.hasNextPage,res.data.nextPage,res.data.hasPreviousPage,res.data.previousPage,blogPagination)
                document.getElementById('auth-detail').innerHTML=`<h1>Blogs by ${res.data.User.name}</h1>`

        }
    })
    .catch(err=>{
        console.log(err)
        if (err.response.status === 404) {
            alert(err.response.data.message);
        } else if (err.response.status === 500) {
            alert(err.response.data.message);
        }
    })
}


home.addEventListener('click',(e)=>{
    e.preventDefault()
    localStorage.removeItem('blogId');
    window.location.href='/home.html'
});

logout.addEventListener('click',(e)=>{
    localStorage.removeItem('blogId');
    window.location.href='/login.html'
});



function pagination(currentPage,hasNextPage,nextPage,hasPreviousPage,previousPage,pages){
    pages.innerHTML='';
    if (hasPreviousPage){
        const prevBtn=document.createElement('button')
        prevBtn.innerHTML=previousPage;
        pages.appendChild(prevBtn);
        prevBtn.addEventListener('click',()=>{
            getBlogsByAuth(authId,previousPage)
            });
    };
    
    const curBtn=document.createElement('button')
    curBtn.innerHTML=currentPage;
    pages.appendChild(curBtn);
    curBtn.addEventListener('click',(e)=>{        
        getBlogsByAuth(authId,currentPage)
    });

    if (hasNextPage){
        const nexBtn=document.createElement('button')
        nexBtn.innerHTML=nextPage;
        pages.appendChild(nexBtn);
        nexBtn.addEventListener('click',()=>{
            getBlogsByAuth(authId,nextPage)
            });
    };
};