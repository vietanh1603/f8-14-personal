const baseUrl = 'https://api-todolist-multiuser.onrender.com/Vanh/todos';

// phuong thuc get
const getMethod = async () => {
    try {
        const response = await fetch(baseUrl);
        return await response.json();
    }
    catch (error) {
        console.log(error);
        alert(error)
    }
}

// phuong thuc post

const postMethod = async (body) => {
    try {
        const response = await fetch(baseUrl, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return await response.json()
    } catch  (e) {
        console.log(e)
    }
}

// phuong thuc put
    const putMethod = async (id, data) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
    return response.json();
};

// phuong thuc delete
const deleteMethod = async (id) => {
    try {
        console.log(id)
        const response = await fetch(
            `${baseUrl}/${id}`,
            {
                method: 'DELETE',
            },
        )
        if (!response.ok) {
            console.log(`Error: ${response.status}`)
        }
        return true;
    }

    catch (error) {
        console.log(`Error: ${error}`)
        return false
    }
}

export { getMethod, postMethod, deleteMethod, putMethod};

