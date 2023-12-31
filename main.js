document.addEventListener('DOMContentLoaded', () => {
    const userList = document.querySelector('.user-list');
    const postInfo = document.querySelector('.post-info');

    function showUserPosts(userId) {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(posts => {
                postInfo.innerHTML = '<h2></h2>';
                if (posts.length > 0) {
                    const postList = document.createElement('ul');
                    posts.forEach(post => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${post.title}: ${post.body}`;
                        postList.appendChild(listItem);
                    });
                    postInfo.appendChild(postList);
                } else {
                    postInfo.innerHTML += '<p>No posts available for this user.</p>';
                }
            })
            .catch(error => console.error('Error fetching posts:', error));
    }

    function showUser(user) {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.name} ${user.email}`;
        listItem.addEventListener('click', () => showUserPosts(user.id));
        userList.appendChild(listItem);
    }

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(showUser);
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
});
