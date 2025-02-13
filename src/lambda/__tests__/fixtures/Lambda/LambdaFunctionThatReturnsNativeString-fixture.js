import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import LambdaFunction from "../../../LambdaFunction.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default class LambdaFunctionThatReturnsNativeString {
  #lambdaFunction

  options = {}

  serverless = {
    config: {
      serverlessPath: "",
      servicePath: resolve(__dirname, "../.."),
    },
    service: {
      provider: {
        arquitecture: "arm64",
        runtime: "nodejs18.x",
      },
    },
  }

  listFunctionNames() {
    return ["foo"]
  }

  getByFunctionName(functionName) {
    const functionDefinition = {
      handler: "fixtures/lambdaFunction-fixture.asyncFunctionHandler",
    }

    this.#lambdaFunction = new LambdaFunction(
      functionName,
      functionDefinition,
      this.serverless,
      this.options,
    )

    return this.#lambdaFunction
  }

  async cleanup() {
    await this.#lambdaFunction.cleanup()
  }
}
