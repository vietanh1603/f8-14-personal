const baseUrl = 'https://8fty49z8qb.execute-api.ap-southeast-1.amazonaws.com'


// get method

const getMethod = async (endpoint) => {
    const reponse = await fetch (`${baseUrl}/${endpoint}`);
    return await reponse.json();
}

// post method

const postMethod = async (endpoint, body) => {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json();
}
// xu li dang nhap

const handleLogin = async (email, password) => {
    try {
        const data = await postMethod('login', {email, password});
        localStorage.setItem('access_token',data.access);
        localStorage.setItem('refresh_token',data.refresh);
        window.location.href = './home.html';
    } catch (error) {
        console.log(error);
    }
};

// lam moi token

const getNewToken = async () => {
    const refresh = localStorage.getItem('refresh')
    if(!refresh) throw new Error('No refresh token');

    const data = await postMethod('get_new_token', {refresh});
    localStorage.setItem('access_token', data.access_token)
    return data.access_token
}

// xu li token
const getPosts = async () => {
    const token = localStorage.getItem('access_token');
    if(!token) throw new Error('Bạn cần login');
    try {
        const response = await fetch(`${baseUrl}/posts`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.posts;
    } catch (error) {
        if (error.message === 'token expired') {
            await getNewToken();
            return getPosts(); // Thử lại sau khi refresh token
        }
        throw error;
    }
}


// xu li trang home
const handleHome = async () => {
    if (window.location.pathname.includes('home.html')) {
        try {
            const posts = await getPosts();
            renderPosts(posts);
        } catch (error) {
            localStorage.clear();
            window.location.href = './index.html';
        }
    }
};

// tao su kien login
document.getElementById('loginBtn')?.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await handleLogin(email, password);
});

window.addEventListener('DOMContentLoaded', handleHome);




