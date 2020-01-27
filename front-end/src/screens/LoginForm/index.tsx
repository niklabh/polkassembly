import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import { UserDetailsContext } from '../../context/UserDetailsContext';
import { useLoginMutation } from '../../generated/auth-graphql';
import { useRouter } from '../../hooks';
import { handleLoginUser } from '../../services/auth.service';
import Button from '../../ui-components/Button';
import FilteredError from '../../ui-components/FilteredError';
import { Form } from '../../ui-components/Form';
import messages from '../../util/messages';

interface Props {
	className?: string
}

const LoginForm = ({ className }:Props): JSX.Element => {
	const currentUser = useContext(UserDetailsContext);
	const { history } = useRouter();
	const [loginMutation, { loading, error }] = useLoginMutation({ context: { uri : process.env.REACT_APP_AUTH_SERVER_GRAPHQL_URL } });
	const { errors, handleSubmit, register } = useForm();

	const handleSubmitForm = (data:Record<string, any>):void => {
		const { username, password } = data;

		if (username && password){
			loginMutation({
				variables: {
					password,
					username
				}
			}).then(({ data }) => {
				if (data && data.login && data.login.token && data.login.user) {
					handleLoginUser({ token: data.login.token, user: data.login.user }, currentUser);
					history.push('/');
				}
			}).catch((e) => {
				console.error('Login error', e);
			});
		}
	};

	return (
		<Grid className={className}>
			<Grid.Column only='tablet computer' tablet={2} computer={4} largeScreen={5} widescreen={6}/>
			<Grid.Column mobile={16} tablet={12} computer={8} largeScreen={6} widescreen={4}>
				<Form onSubmit={handleSubmit(handleSubmitForm)}>
					<h3>Login</h3>
					<Form.Group>
						<Form.Field width={16}>
							<label>Username</label>
							<input
								className={errors.username ? 'error' : ''}
								name='username'
								placeholder='John'
								ref={register({ minLength: 3, required: true })}
								type='text'
							/>
							{errors.username && <span className={'errorText'}>{messages.VALIDATION_USERNAME_ERROR}</span>}
						</Form.Field>
					</Form.Group>

					<Form.Group>
						<Form.Field width={16}>
							<label>Password</label>
							<input
								className={errors.password ? 'error' : ''}
								name='password'
								placeholder='Password'
								ref={register({ minLength: 6, required: true })}
								type='password'
							/>
							{errors.password && <span className={'errorText'}>{messages.VALIDATION_PASSWORD_ERROR}</span>}

							<div className='text-muted'>
								<Link className='dangerText' to='/request-reset-password'>Forgot your password?</Link>
							</div>
						</Form.Field>
					</Form.Group>
					<div className={'mainButtonContainer'}>
						<Button
							primary
							disabled={loading}
							type='submit'
						>
							Login
						</Button>
						{error && <FilteredError text={error.message}/>	}
					</div>
				</Form>
			</Grid.Column>
			<Grid.Column only='tablet computer' tablet={2} computer={4} largeScreen={5} widescreen={6}/>
		</Grid>
	);
};

export default styled(LoginForm)`
	.mainButtonContainer {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	input.error {
		border-color: #fe4850 !important;
	}

	.errorText {
		color: #fe4850;
	}

	.dangerText {
		color: #fe4850;
	}
`;
