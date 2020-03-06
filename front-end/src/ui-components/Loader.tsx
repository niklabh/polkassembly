// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';
import { Dimmer, Loader as SUILoader } from 'semantic-ui-react';
import styled from 'styled-components';

interface Props{
    className?: string
}
const Loader = ({ className }: Props) => {
	return (
		<Dimmer inverted active className={className}>
			<SUILoader inverted>Loading</SUILoader>
		</Dimmer>
	);
};

export default styled(Loader)`
    background-color: inherit!important;
`;
