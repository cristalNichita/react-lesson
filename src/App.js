import axios from "axios";
import React, { useState, useMemo } from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/MyModal/MyModal";
import './css/App.css';
import { usePosts } from "./hooks/usePosts";

function App() {

	const [posts, setPosts] = useState([]);

	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	}

	async function fetchPosts() {
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
		setPosts(response.data);
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	}

	return (
		<div className="App">
			<button onClick={fetchPosts}>клик</button>
			<MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
				Создать пост
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>

			<hr style={{margin: '15px 0'}}></hr>

			<PostFilter 
				filter={filter} 
				setFilter={setFilter} 
			/>

			<PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />
		</div>
	);
}

export default App;
