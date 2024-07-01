document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.getElementById('post-button');
    const postContent = document.getElementById('post-content');
    const postsContainer = document.getElementById('posts');
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const logoutButton = document.getElementById('logout-button');
    const floatingPostButton = document.getElementById('floating-post-button');
    const userInfo = document.getElementById('user-info');
    const loginReminder = document.getElementById('login-reminder');
    const overlay = document.getElementById('overlay');
    const overlayNewPost = document.getElementById('overlay-new-post');
    const overlayThread = document.getElementById('overlay-thread');
    const overlayReplyContent = document.getElementById('overlay-reply-content');
    const overlayReplyButton = document.getElementById('overlay-reply-button');
    const overlayPostContent = document.getElementById('overlay-post-content');
    const overlayPostButton = document.getElementById('overlay-post-button');
    const closeOverlay = document.getElementById('close-overlay');
    const closeNewPostOverlay = document.getElementById('close-new-post-overlay');
    const selectGifButton = document.getElementById('select-gif-button');
    const selectImageButton = document.getElementById('select-image-button');
    const selectEmojiButton = document.getElementById('select-emoji-button');
    const overlaySelectGifButton = document.getElementById('overlay-select-gif-button');
    const overlaySelectImageButton = document.getElementById('overlay-select-image-button');
    const overlaySelectEmojiButton = document.getElementById('overlay-select-emoji-button');
    const emojiPickerContainer = document.getElementById('emoji-picker-container');
    const overlayEmojiPickerContainer = document.getElementById('overlay-emoji-picker-container');
    const mediaUpload = document.getElementById('media-upload');
    const uploadMediaButton = document.getElementById('upload-media-button');
    const overlayMediaUpload = document.getElementById('overlay-media-upload');
    const overlayUploadMediaButton = document.getElementById('overlay-upload-media-button');
    const overlayNewPostMediaUpload = document.getElementById('overlay-new-post-media-upload');
    const overlayNewPostUploadMediaButton = document.getElementById('overlay-new-post-upload-media-button');
    const gifModal = document.getElementById('gif-modal');
    const imageModal = document.getElementById('image-modal');
    const gifSearch = document.getElementById('gif-search');
    const imageSearch = document.getElementById('image-search');
    const gifResults = document.getElementById('gif-results');
    const imageResults = document.getElementById('image-results');
    const closeGifModal = document.getElementById('close-gif-modal');
    const closeImageModal = document.getElementById('close-image-modal');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let currentReplyPostId = null;
    let currentReplyId = null;

    const giphyApiKey = 'uj4PuiA23xuk2f5hJkkPeF28QHdyHaJn';
    const unsplashApiKey = 'znlJrW_WSCXhynYEAh54MQytz_ASWLGd6gs_NUYfphM';

    console.log('Current user:', currentUser);

    const showLoginReminder = () => {
        if (!currentUser) {
            loginReminder.style.display = 'block';
            document.getElementById('new-post').style.display = 'none';
            floatingPostButton.style.display = 'none';
            console.log('User not logged in. Showing login reminder.');
        } else {
            loginReminder.style.display = 'none';
            document.getElementById('new-post').style.display = 'block';
            floatingPostButton.style.display = 'none';
            userInfo.textContent = `Logged in as @${currentUser.nome}`;
            logoutButton.style.display = 'block';
            console.log('User logged in as', currentUser.nome);
        }
    };

    const toggleFloatingPostButton = () => {
        const newPostSection = document.getElementById('new-post');
        const newPostBottom = newPostSection.getBoundingClientRect().bottom;
        if (newPostBottom < 0) {
            floatingPostButton.style.display = 'block';
        } else {
            floatingPostButton.style.display = 'none';
        }
    };

    window.addEventListener('scroll', toggleFloatingPostButton);

    const createPostElement = (post, user, level = 0) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.style.marginLeft = `${level * 20}px`;
        postElement.innerHTML = `
            <p><strong>@${user.nome}</strong>: ${post.content}</p>
            <p><small>${new Date(post.date).toLocaleString()}</small></p>
            ${post.media ? `<p><a href="${post.media}" target="_blank">View Media</a></p>` : ''}
            <div>
                <button class="like-button" data-post-id="${post.id}"> ${post.likes || 0}</button>
                <button class="retweet-button" data-post-id="${post.id}"> ${post.retweets ? post.retweets.length : 0}</button>
                <button class="reply-button" data-post-id="${post.id}"> ${post.replies ? post.replies.length : 0}</button>
            </div>
            <div class="replies">${post.replies.map(reply => createReplyElement(reply, post.id, level + 1)).join('')}</div>
        `;
        return postElement;
    };

    const createReplyElement = (reply, postId, level) => {
        return `
            <div class="reply" style="margin-left: ${level * 20}px;">
                <p><strong>@${reply.usuarioNome}</strong>: ${reply.content}</p>
                <p><small>${new Date(reply.date).toLocaleString()}</small></p>
                ${reply.media ? `<p><a href="${reply.media}" target="_blank">View Media</a></p>` : ''}
                <div>
                    <button class="like-button" data-post-id="${postId}" data-reply-id="${reply.id}"> ${reply.likes || 0}</button>
                    <button class="retweet-button" data-post-id="${postId}" data-reply-id="${reply.id}"> ${reply.retweets ? reply.retweets.length : 0}</button>
                    <button class="reply-button" data-post-id="${postId}" data-reply-id="${reply.id}"> ${reply.replies ? reply.replies.length : 0}</button>
                </div>
                <div class="replies">${reply.replies ? reply.replies.map(r => createReplyElement(r, postId, level + 1)).join('') : ''}</div>
            </div>
        `;
    };

    const fetchPosts = async () => {
        console.log('Fetching posts...');
        try {
            const response = await fetch('http://localhost:5000/posts');
            const posts = await response.json();
            console.log('Posts fetched:', posts);
            postsContainer.innerHTML = '';
            const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            for (const post of sortedPosts) {
                const userResponse = await fetch(`http://localhost:5000/usuarios/${post.usuarioId}`);
                const user = await userResponse.json();
                const postElement = createPostElement(post, user);
                postsContainer.appendChild(postElement);
            }

            document.querySelectorAll('.like-button').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const postId = e.target.getAttribute('data-post-id');
                    const replyId = e.target.getAttribute('data-reply-id');
                    let postResponse, post;
                    if (replyId) {
                        postResponse = await fetch(`http://localhost:5000/posts/${postId}`);
                        post = await postResponse.json();
                        const reply = findReplyById(post.replies, replyId);
                        reply.likes = (reply.likes || 0) + 1;
                        await fetch(`http://localhost:5000/posts/${postId}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ replies: post.replies })
                        });
                    } else {
                        postResponse = await fetch(`http://localhost:5000/posts/${postId}`);
                        post = await postResponse.json();
                        post.likes = (post.likes || 0) + 1;
                        await fetch(`http://localhost:5000/posts/${postId}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ likes: post.likes })
                        });
                    }
                    fetchPosts();
                });
            });

            document.querySelectorAll('.retweet-button').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const postId = e.target.getAttribute('data-post-id');
                    const replyId = e.target.getAttribute('data-reply-id');
                    let postResponse, post, newPost;
                    if (replyId) {
                        postResponse = await fetch(`http://localhost:5000/posts/${postId}`);
                        post = await postResponse.json();
                        const reply = findReplyById(post.replies, replyId);
                        reply.retweets = reply.retweets || [];
                        reply.retweets.push({
                            id: Date.now().toString(),
                            usuarioId: currentUser.id,
                            usuarioNome: currentUser.nome,
                            content: `Retweet: ${reply.content}`,
                            date: new Date(),
                            likes: 0,
                            replies: [],
                            retweets: []
                        });
                        await fetch(`http://localhost:5000/posts/${postId}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ replies: post.replies })
                        });
                        newPost = {
                            usuarioId: currentUser.id,
                            content: `Retweet: ${reply.content}`,
                            date: new Date(),
                            likes: 0,
                            replies: [],
                            retweets: [],
                            mentions: []
                        };
                    } else {
                        postResponse = await fetch(`http://localhost:5000/posts/${postId}`);
                        post = await postResponse.json();
                        post.retweets = post.retweets || [];
                        post.retweets.push({
                            id: Date.now().toString(),
                            usuarioId: currentUser.id,
                            usuarioNome: currentUser.nome,
                            content: `Retweet: ${post.content}`,
                            date: new Date(),
                            likes: 0,
                            replies: [],
                            retweets: []
                        });
                        await fetch(`http://localhost:5000/posts/${postId}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ retweets: post.retweets })
                        });
                        newPost = {
                            usuarioId: currentUser.id,
                            content: `Retweet: ${post.content}`,
                            date: new Date(),
                            likes: 0,
                            replies: [],
                            retweets: [],
                            mentions: post.mentions
                        };
                    }
                    await fetch('http://localhost:5000/posts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newPost)
                    });
                    fetchPosts();
                });
            });

            document.querySelectorAll('.reply-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    const postId = e.target.getAttribute('data-post-id');
                    const replyId = e.target.getAttribute('data-reply-id');
                    currentReplyPostId = postId;
                    currentReplyId = replyId;
                    overlay.style.display = 'flex';
                    const postResponse = fetch(`http://localhost:5000/posts/${postId}`).then(res => res.json()).then(post => {
                        const threadHTML = createPostElement(post, currentUser, 0).outerHTML;
                        overlayThread.innerHTML = threadHTML;
                    });
                });
            });

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    if (loginButton) {
        loginButton.addEventListener('click', async () => {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            console.log('Attempting login with', email, password);
            try {
                const response = await fetch(`http://localhost:5000/usuarios?email=${email}&senha=${password}`);
                const users = await response.json();
                console.log('Login response:', users);
                if (users.length > 0) {
                    currentUser = users[0];
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    window.location.href = 'index.html';
                } else {
                    alert('Invalid login credentials');
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        });
    }

    if (registerButton) {
        registerButton.addEventListener('click', async () => {
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const biography = document.getElementById('register-biography').value;
            const newUser = { nome: name, email, senha: password, biografia: biography };
            console.log('Registering new user:', newUser);
            try {
                await fetch('http://localhost:5000/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });
                alert('Registration successful! Please log in.');
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Error during registration:', error);
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            console.log('Logging out');
            localStorage.removeItem('currentUser');
            currentUser = null;
            window.location.href = 'index.html';
        });
    }

    if (postButton) {
        postButton.addEventListener('click', async () => {
            const content = postContent.value.trim();
            console.log('Attempting to post content:', content);
            if (content && currentUser) {
                const newPost = {
                    usuarioId: currentUser.id,
                    content: content,
                    date: new Date(),
                    likes: 0,
                    replies: [],
                    retweets: [],
                    mentions: []
                };
                console.log('New post data:', newPost);
                try {
                    await fetch('http://localhost:5000/posts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newPost)
                    });
                    postContent.value = '';
                    fetchPosts();
                } catch (error) {
                    console.error('Error posting new content:', error);
                }
            } else {
                alert('Please log in and enter some content to post.');
            }
        });
    }

    if (floatingPostButton) {
        floatingPostButton.addEventListener('click', () => {
            overlayNewPost.style.display = 'flex';
        });
    }

    const findReplyById = (replies, id) => {
        for (let reply of replies) {
            if (reply.id === id) {
                return reply;
            }
            if (reply.replies && reply.replies.length > 0) {
                const nestedReply = findReplyById(reply.replies, id);
                if (nestedReply) {
                    return nestedReply;
                }
            }
        }
        return null;
    };

    closeOverlay.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    closeNewPostOverlay.addEventListener('click', () => {
        overlayNewPost.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
        if (event.target === overlayNewPost) {
            overlayNewPost.style.display = 'none';
        }
        if (event.target === gifModal) {
            gifModal.style.display = 'none';
        }
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            overlay.style.display = 'none';
            overlayNewPost.style.display = 'none';
            gifModal.style.display = 'none';
            imageModal.style.display = 'none';
        }
    });

    // Giphy and Unsplash Integration
    const fetchGif = async (query) => {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${query}&limit=10`);
        const data = await response.json();
        return data.data.map(gif => gif.images.fixed_height.url);
    };

    const fetchImage = async (query) => {
        const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=${query}&per_page=10`);
        const data = await response.json();
        return data.results.map(image => image.urls.small);
    };

    const showGifResults = async (query) => {
        const gifUrls = await fetchGif(query);
        gifResults.innerHTML = gifUrls.map(url => `<img src="${url}" class="gif-result">`).join('');
        document.querySelectorAll('.gif-result').forEach(img => {
            img.addEventListener('click', () => {
                postContent.value += ` ![GIF](${img.src})`;
                gifModal.style.display = 'none';
            });
        });
    };

    const showImageResults = async (query) => {
        const imageUrls = await fetchImage(query);
        imageResults.innerHTML = imageUrls.map(url => `<img src="${url}" class="image-result">`).join('');
        document.querySelectorAll('.image-result').forEach(img => {
            img.addEventListener('click', () => {
                postContent.value += ` ![Image](${img.src})`;
                imageModal.style.display = 'none';
            });
        });
    };

    selectGifButton.addEventListener('click', () => {
        gifModal.style.display = 'flex';
    });

    selectImageButton.addEventListener('click', () => {
        imageModal.style.display = 'flex';
    });

    gifSearch.addEventListener('input', () => {
        showGifResults(gifSearch.value);
    });

    imageSearch.addEventListener('input', () => {
        showImageResults(imageSearch.value);
    });

    closeGifModal.addEventListener('click', () => {
        gifModal.style.display = 'none';
    });

    closeImageModal.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });

    // Emoji Picker Integration
    const picker = new EmojiMart.Picker({ onEmojiSelect: emoji => postContent.value += emoji.native });
    const overlayPicker = new EmojiMart.Picker({ onEmojiSelect: emoji => overlayReplyContent.value += emoji.native });

    selectEmojiButton.addEventListener('click', () => {
        emojiPickerContainer.style.display = 'block';
        emojiPickerContainer.appendChild(picker);
    });

    overlaySelectEmojiButton.addEventListener('click', () => {
        overlayEmojiPickerContainer.style.display = 'block';
        overlayEmojiPickerContainer.appendChild(overlayPicker);
    });

    // Upload Media Integration
    uploadMediaButton.addEventListener('click', () => {
        mediaUpload.click();
    });

    overlayUploadMediaButton.addEventListener('click', () => {
        overlayMediaUpload.click();
    });

    overlayNewPostUploadMediaButton.addEventListener('click', () => {
        overlayNewPostMediaUpload.click();
    });

    const handleMediaUpload = (inputElement, textAreaElement) => {
        inputElement.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) { // Limite de 5MB
                    alert('File is too large. Maximum size is 5MB.');
                    return;
                }
                const formData = new FormData();
                formData.append('file', file);
                try {
                    const response = await fetch('/upload', {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();
                    if (data.url) {
                        textAreaElement.value += ` ![Media](${data.url})`;
                    } else {
                        alert('Failed to upload media');
                    }
                } catch (error) {
                    console.error('Error uploading media:', error);
                    alert('Error uploading media');
                }
            }
        });
    };

    handleMediaUpload(mediaUpload, postContent);
    handleMediaUpload(overlayMediaUpload, overlayReplyContent);
    handleMediaUpload(overlayNewPostMediaUpload, overlayPostContent);

    overlayReplyButton.addEventListener('click', async () => {
        const replyContent = overlayReplyContent.value.trim();
        console.log('Attempting to post reply:', replyContent);
        if (replyContent && currentUser) {
            if (currentReplyId) {
                fetch(`http://localhost:5000/posts/${currentReplyPostId}`).then(res => res.json()).then(post => {
                    const reply = findReplyById(post.replies, currentReplyId);
                    reply.replies = reply.replies || [];
                    reply.replies.push({
                        id: Date.now().toString(),
                        usuarioId: currentUser.id,
                        usuarioNome: currentUser.nome,
                        content: replyContent,
                        date: new Date(),
                        likes: 0,
                        replies: []
                    });
                    fetch(`http://localhost:5000/posts/${currentReplyPostId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ replies: post.replies })
                    }).then(() => {
                        overlay.style.display = 'none';
                        fetchPosts();
                    });
                });
            } else {
                fetch(`http://localhost:5000/posts/${currentReplyPostId}`).then(res => res.json()).then(post => {
                    post.replies = post.replies || [];
                    post.replies.push({
                        id: Date.now().toString(),
                        usuarioId: currentUser.id,
                        usuarioNome: currentUser.nome,
                        content: replyContent,
                        date: new Date(),
                        likes: 0,
                        replies: []
                    });
                    fetch(`http://localhost:5000/posts/${currentReplyPostId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ replies: post.replies })
                    }).then(() => {
                        overlay.style.display = 'none';
                        fetchPosts();
                    });
                });
            }
        }
    });

    overlayPostButton.addEventListener('click', async () => {
        const content = overlayPostContent.value.trim();
        console.log('Attempting to post content:', content);
        if (content && currentUser) {
            const newPost = {
                usuarioId: currentUser.id,
                content: content,
                date: new Date(),
                likes: 0,
                replies: [],
                retweets: [],
                mentions: []
            };
            console.log('New post data:', newPost);
            try {
                await fetch('http://localhost:5000/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newPost)
                });
                overlayPostContent.value = '';
                overlayNewPost.style.display = 'none';
                fetchPosts();
            } catch (error) {
                console.error('Error posting new content:', error);
            }
        } else {
            alert('Please log in and enter some content to post.');
        }
    });

    showLoginReminder();
    fetchPosts();
});
