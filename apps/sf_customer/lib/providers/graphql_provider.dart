import 'dart:convert';
import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:get/get.dart';
import 'package:gql/ast.dart' show DocumentNode;
import 'package:gql/language.dart' show printNode;

class GraphQLException implements Exception {
  final String message;
  final List<dynamic>? errors;

  GraphQLException(this.message, [this.errors]);

  @override
  String toString() => 'GraphQLException: $message';
}

typedef MockHandler = Future<Map<String, dynamic>> Function(
  String query,
  Map<String, dynamic>? variables,
)?;

String get defaultEndpoint {
  const envUrl = String.fromEnvironment('API_URL');
  if (envUrl.isNotEmpty) return envUrl;

  if (kIsWeb) return 'http://localhost:3000/graphql';

  try {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:3000/graphql';
    }
  } catch (_) {}

  return 'http://localhost:3000/graphql';
}

class GraphQLProvider extends GetConnect {
  static String? _customEndpoint;

  static String get endpoint => _customEndpoint ?? defaultEndpoint;
  static set endpoint(String value) => _customEndpoint = value;

  String? authToken;
  MockHandler mockHandler;

  GraphQLProvider({this.authToken, this.mockHandler}) {
    baseUrl = endpoint;
  }

  @override
  void onInit() {
    baseUrl = endpoint;
    httpClient.baseUrl = endpoint;
    super.onInit();
  }

  Future<T> execute<T>({
    required dynamic document,
    required T Function(Map<String, dynamic> json) fromJson,
    Map<String, dynamic>? variables,
  }) async {
    final data = await sendQuery(document, variables: variables);
    return fromJson(data);
  }

  Future<Map<String, dynamic>> sendQuery(
    dynamic queryDoc, {
    Map<String, dynamic>? variables,
  }) async {
    final docString = queryDoc is DocumentNode ? printNode(queryDoc) : queryDoc.toString();

    if (mockHandler != null) {
      return mockHandler!(docString, variables);
    }

    final reqHeaders = <String, String>{
      'Content-Type': 'application/json',
      if (authToken != null && authToken!.isNotEmpty)
        'Authorization': 'Bearer $authToken',
    };

    Response response;
    try {
      response = await post(
        '',
        {
          'query': docString,
          ...?variables != null ? {'variables': variables} : null,
        },
        headers: reqHeaders,
      );
    } catch (e) {
      throw GraphQLException('Network connection failed ($endpoint): $e');
    }

    if (response.hasError) {
      throw GraphQLException(
        'HTTP Error ${response.statusCode}: ${response.statusText ?? response.bodyString}',
      );
    }

    final body = response.body;
    final Map<String, dynamic> json;
    if (body is Map<String, dynamic>) {
      json = body;
    } else if (body is String) {
      json = jsonDecode(body) as Map<String, dynamic>;
    } else {
      throw GraphQLException('Invalid response format');
    }

    if (json.containsKey('errors') && json['errors'] != null) {
      final errors = json['errors'] as List<dynamic>;
      final msg = errors.isNotEmpty
          ? errors[0]['message']?.toString() ?? 'GraphQL Error'
          : 'GraphQL Error';
      throw GraphQLException(msg, errors);
    }

    return (json['data'] as Map<String, dynamic>?) ?? <String, dynamic>{};
  }
}
