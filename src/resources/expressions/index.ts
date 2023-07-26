import { Base } from '../base';
import { AssetExpressionValuesUpdateProps, AssetsExpressionValuesUpdateProps, BulkExpressionValuesUpdateProps, CollectionExpressionValuesUpdateProps, Expression, ExpressionCreationProps, ExpressionUpdateProps } from './types';

export class Expressions extends Base {
  getExpressionsTypes(slotId: string): Promise<unknown> {
    return this.request('/expression/types');
  }
  /* does not exist
  getExpression(id: string): Promise<Expression> {
    return this.request(`/expression/info?expressionId=${id}`);
  }
  */
  /* does not exist
  getExpressions(ids: string[]): Promise<Expression[]> {
    return this.request(`/expression/info?expressionIds=${ids}`);
  }
  */
  getSlotExpressions(slotId: string): Promise<Expression[]> {
    return this.request(`/expression/slot?slotId=${slotId}`);
  }
  createExpression(update: ExpressionCreationProps): Promise<boolean> {
    return this.request('/expression/new', {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }
  updateExpression(update: ExpressionUpdateProps): Promise<boolean> {
    return this.request('/expression/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  updateAssetExpressionValues(update: AssetExpressionValuesUpdateProps): Promise<boolean> {
    return this.request('/expression/values/nft', {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }
  updateAssetsExpressionValues(update: AssetsExpressionValuesUpdateProps): Promise<boolean> {
    return this.request('/expression/values/nfts', {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }
  updateCollectionExpressionValues(update: CollectionExpressionValuesUpdateProps): Promise<boolean> {
    return this.request('/expression/values/collection', {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }
  updateBulkExpressionValues(update: BulkExpressionValuesUpdateProps): Promise<boolean> {
    return this.request('/expression/values/bulk', {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }
}