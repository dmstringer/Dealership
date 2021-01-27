import { Query, Resolver } from "type-graphql";

@Resolver((of) => String)
export default class {
  @Query(() => String)
  helloWorld(): any {
    return "hello world";
  }
}
