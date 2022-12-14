import axios from 'axios';
import React, { lazy, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'timeago.js';
import Avvvatars from 'avvvatars-react';

const Container = styled.div`
	width: 20.7em;
	margin-bottom: 45px;
	gap: 10px;
`;

const Image = styled.img`
	/* width: 320px;
	height: 180px; */
	width: 20em;
	height: 11em;
	background-color: #999;
	flex: 1;
	object-fit: 100%;
	box-shadow: ${({ theme }) => theme.navShadow} 0px 15px 30px -15px;
`;

const Details = styled.div`
	display: flex;
	margin-top: 10px;
	gap: 12px;
	flex: 1;
`;

const Texts = styled.div``;

const Title = styled.h1`
	font-size: 16px;
	font-weight: 500;
	color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
	font-size: 14px;
	color: ${({ theme }) => theme.textSoft};
	margin-top: 10px;
	margin-bottom: 2px;
`;

const Info = styled.div`
	font-size: 14px;
	color: ${({ theme }) => theme.textSoft};
`;

export const Card = ({ type, video }) => {
	const [channel, setChannel] = useState({});

	useEffect(() => {
		const fetchChannel = async () => {
			const res = await axios.get(`/users/find/${video.userId}`);
			setChannel(res.data);
		};
		fetchChannel();
	}, [video.userId]);

	return (
		<Container type={type}>
			<Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
				<Image type={type} src={video.imgUrl} />
			</Link>
			<Details type={type}>
				<Avvvatars type={type} style="shape" size={38} value={channel.img} />
				<Texts>
					<Title>{video.title}</Title>
					<ChannelName>{channel.name}</ChannelName>
					<Info>
						{video.views} views • {format(video.createdAt)}
					</Info>
				</Texts>
			</Details>
		</Container>
	);
};

export default Card;
