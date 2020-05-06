// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { DeriveBalancesAccount } from '@polkadot/api-derive/types';
import { ApiPromiseContext } from '@substrate/context';
import styled from '@xstyled/styled-components';
import React, { useContext, useEffect, useState } from 'react';
import formatBnBalance from 'src/util/formatBnBalance';

interface Props {
	address: string
	className?: string
}

const Balance = ({ address, className }: Props) => {
	const [balance, setBalance] = useState<string>('0');
	const { api, isApiReady } = useContext(ApiPromiseContext);

	useEffect(() => {
		if (!isApiReady) {
			return;
		}

		let unsubscribe: () => void;

		api.derive.balances.account(address, (info : DeriveBalancesAccount) =>
			setBalance(info.freeBalance?.toString() || '0')
		)
			.then(unsub => { unsubscribe = unsub; })
			.catch(e => console.error(e));

		return () => unsubscribe && unsubscribe();
	}, [address, api, isApiReady]);

	return (
		<div className={className}>
			<span>{formatBnBalance(balance, { numberAfterComma: 2, withUnit: true })}</span> available.
		</div>
	);
};

export default styled(Balance)`
	color: black_text;

	span {
		color: black_primary;
		font-weight: 500;
	}
`;