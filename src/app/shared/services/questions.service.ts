import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class QuestionsService {

  constructor(private apiService: ApiService) { }

  getLinkForQuestions() {
    return this.apiService.getLink('question/get_questions_list');
  }

  getQuestions(): Promise<any> {
    return this.apiService.get('question/get_questions_list');
  }

  getQuestionsCount() {
    return this.apiService.get('question/get_questions_count');
  }

  getQuestionDetail(questions_id) {
    const params = new HttpParams().set('questions_id', questions_id);
    return this.apiService.get('question/get_questions_detail', params);
  }

  addQuestion(template) {
    return this.apiService.post('question/add_new_question', {template});
  }

  updateQuestion(questions_id, template) {
    return this.apiService.post('question/update_question', {questions_id, template});
  }

  deleteQuestion(questions_id) {
    return this.apiService.post('question/delete_question', {questions_id});
  }
}