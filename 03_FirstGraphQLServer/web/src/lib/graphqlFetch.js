const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default url => args => {
    const body = JSON.stringify(args);
    console.log('graphqlFetch::', body);
    return fetch(url, { ...options, body })
            .then(res => res.json());
}