import React from 'react';

import styled from 'libs/styled';

const SubTitle = styled.h2`
    font-weight: bold;
    font-size: 2.3rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.primaryText};
    margin-bottom: 8px;
`;

export default SubTitle;
