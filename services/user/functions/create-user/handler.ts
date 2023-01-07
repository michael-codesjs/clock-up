import { withLambdaIOStandard } from "../../../../shared/typescript/hofs/with-lambda-io-standard";
import { Create } from "../../../../shared/typescript/io/types/user";
import { CommonIOHandler } from "../../../../shared/typescript/middleware/common-lambda-io/types";
import { User } from "../../framework";
import { User as UserGraphQlEntity } from "../../../../shared/typescript/types/api";

const handler: CommonIOHandler<Create, Array<UserGraphQlEntity>> = async event => {

	const responses: Array<UserGraphQlEntity> = [];

	for(const input of event.inputs) {
		
		const payload = { ...input, alarms: 0 };
		
		const user = new User(payload);
		await user.put();
		
		const userGraphQlEntity = await user.graphQlEntity();

		responses.push(userGraphQlEntity);

	}

	return responses;

};

export const main = withLambdaIOStandard(handler);