import { Base } from '../base';
import { Expression, ExpressionUpdate } from './types';

export class Expressions extends Base {
  getExpression(id: string): Promise<Expression> {
    return this.request(`/expression/info?expressionId=${id}`);
  }
  /*
  getExpressions(ids: string[]): Promise<Expression[]> {
    return this.request(`/expression/info?expressionIds=${ids}`);
  }
  */
  updateExpression(update: ExpressionUpdate): Promise<boolean> {
    return this.request('/expression/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  // /values/collection
  // /slot
  
}