
const loginBtnRef = document.querySelector('#loginBtn');

const onMounted = () => {
    const accessToken = localStorage.getItem('access');
    // co access token thi vao trong home
    if(accessToken) {
        window.location.href = '../home.html'
    }
}

const baseUrl = 'https://8fty49z8qb.execute-api.ap-southeast-1.amazonaws.com'

// get method
const getMethod = async (endpoint) => {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
method: 'GET',
    headers: {
    'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
}
});
const data = await response.json()

if(data.detail === 'token expired') {
    await getNewToken(() => getMethod(endpoint))
}
console.log(data)

return data;
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
    const data = await response.json()

    if(data.detail === 'token expired') {
        await getNewToken(() => postMethod(endpoint, body))
    }
    console.log(data)

    return data;
}

// get new token
const getNewToken = async (callback) => {
    const data = await postMethod('get_new_token', {
        refresh: localStorage.getItem('refresh')
    })
    console.log(data)
    if(data.access) {
        localStorage.setItem('access', data.access)
        await callback()
    }
}

// tao su kien cho button
loginBtnRef.addEventListener('click', async () => {
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.pass').value;

    try {
        const data = await postMethod('login', {
            email: email,
            password: password
        });

        if (data.access) {
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            window.location.href = '../home.html';
        }
    } catch (error) {
        console.log('Login error:', error);
    }
});

onMounted();
