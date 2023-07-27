import { Base } from './base';
import { Expression, CreateExpressionProps, UpdateExpressionProps, UpdateAssetExpressionValuesProps, UpdateAssetsExpressionValuesProps, UpdateCollectionExpressionValuesProps, UpdateBulkExpressionValuesProps } from '../types/expression';

export class Expressions extends Base {
  getExpressionTypes(): Promise<unknown> {
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
  createExpression(update: CreateExpressionProps): Promise<boolean> {
    return this.request('/expression/new', {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }
  updateExpression(update: UpdateExpressionProps): Promise<boolean> {
    return this.request('/expression/update', {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }
  updateAssetExpressionValues(update: UpdateAssetExpressionValuesProps): Promise<boolean> {
    return this.request('/expression/values/nft', {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }
  updateAssetsExpressionValues(update: UpdateAssetsExpressionValuesProps): Promise<boolean> {
    return this.request('/expression/values/nfts', {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }
  updateCollectionExpressionValues(update: UpdateCollectionExpressionValuesProps): Promise<boolean> {
    return this.request('/expression/values/collection', {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }
  updateBulkExpressionValues(update: UpdateBulkExpressionValuesProps): Promise<boolean> {
    return this.request('/expression/values/bulk', {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }
}