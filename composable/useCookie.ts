import { ref } from 'vue';

export default function useCookie() {
    const cookieValue = ref(null);
    const access_token = ref('')

    function setCookie(name: string, value: string, options = {}) {
        document.cookie = `${name}=${value}; ${options}`;
    }

    function getCookie(name: string) {
        if (document) {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(`${name}=`)) {
                    return cookie.substring(name.length + 1);
                }
            }
        }

        return '';
    }

    return {
        cookieValue,
        setCookie,
        getCookie,
    };
}