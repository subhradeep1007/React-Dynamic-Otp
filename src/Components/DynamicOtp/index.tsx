import React, { useEffect, useState, createRef, useCallback } from 'react';
import { OtpWrapper } from './styles.ts';
import { keyCode } from './constants.ts';

interface Props {
	numberOfDigits: number;
	onOtpChange: Function;
	isResendOtpClicked: Boolean;
}

const DynamicOtp = (props: Props) => {
	const { numberOfDigits, onOtpChange, isResendOtpClicked } = props;

	const initialOtpRefArray = Array.from({ length: numberOfDigits }).map(() => createRef());
	const initalOtpValueArray = Array.from({ length: numberOfDigits }).fill('');

	const [otpInputRef, setotpInputRef] = useState<any>(initialOtpRefArray);
	const [isPasted, setisPasted] = useState(false);
	const [otpValues, setotpValues] = useState<any>(initalOtpValueArray);

	useEffect(() => {
		otpInputRef[0].current.focus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		onOtpChange(otpValues.join(''));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [otpValues]);

	useEffect(() => {
		isResendOtpClicked && resetValuesToDefault();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isResendOtpClicked]);

	const resetValuesToDefault = () => {
		setotpValues(initalOtpValueArray);
		setotpInputRef(initialOtpRefArray);
	};

	const clearOtp = () => {
		const newArray = [...otpValues];
		newArray.fill('');
		setotpValues([...newArray]);
	};

	const populateOtp = (value) => {
		const newArray = [...otpValues];
		for (let refIndex = 0; refIndex < numberOfDigits; refIndex++) {
			if (refIndex < value.length) {
				newArray[refIndex] = value[refIndex];
			}
		}
		setotpValues([...newArray]);
	};

	const focusOnNext = useCallback(
		(index) => {
			if (index < numberOfDigits - 1) {
				otpInputRef[index + 1].current.focus();
			}
		},
		[otpInputRef, numberOfDigits]
	);

	const focusOnPrevious = useCallback(
		(index) => {
			index > 0 && otpInputRef[index - 1].current.focus();
		},
		[otpInputRef]
	);

	const updateOtpValues = (index, value) => {
		const newArray = [...otpValues];
		newArray[index] = value;
		setotpValues(newArray);
	};

	const handleOtpChange = (value, index) => {
		if (!isNaN(value)) {
			if (!isPasted && value.length === 1) {
				updateOtpValues(index, value);
				focusOnNext(index);
			} else if (isPasted) {
				const isInputFieldNull = otpValues[index] === '' ? true : false;
				const updatedValue = value.substr(1);
				if (isInputFieldNull) {
					if (value.length === numberOfDigits) {
						clearOtp();
						populateOtp(value);
					}
				} else {
					if (value.length === numberOfDigits + 1) {
						clearOtp();
						populateOtp(updatedValue);
					}
				}
				setisPasted(false);
			}
		}
	};

	const handleKeyPress = (e, index) => {
		switch (e.keyCode) {
			case keyCode.LEFT_ARROW:
				focusOnPrevious(index);
				break;
			case keyCode.RIGHT_ARROW:
				focusOnNext(index);
				break;
			case keyCode.BACKSPACE: {
				if (e.target.value) {
					updateOtpValues(index, '');
				} else {
					focusOnPrevious(index);
					e.preventDefault();
				}
			}
		}
	};
	return (
		<OtpWrapper className='otp-wrapper'>
			{otpInputRef?.map((ref, idx) => {
				return (
					<input
						ref={ref}
						value={otpValues[idx].toString()}
						onChange={(e) => handleOtpChange(e.target.value.trim(), idx)}
						type='text'
						className='input'
						onPaste={() => {
							setisPasted(true);
						}}
                        onClick={(e)=>e.stopPropagation()}
						onKeyUp={(e) => handleKeyPress(e, idx)}
					/>
				);
			})}
		</OtpWrapper>
	);
};

export default DynamicOtp;
