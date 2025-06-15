const onMounted = () => {
    const accessToken = localStorage.getItem('access');
    // khong co access token quay lai trang dang nhap
    if(!accessToken) {
        window.location.href = '../index.html'
    }
}
onMounted();